// Enforces "no repeated styles": styles live in ui components and design tokens only.
// Rules: no inline style, no color literals outside tokens, no arbitrary utility values,
// no identical class lists in two places, no long inline class lists outside src/components/ui.
// Escape hatch for a justified exception: put `check-styles-ignore` on the line or the line above.
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAX_INLINE_CLASS_TOKENS } from './conventions.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../..');
const STYLE_EXTENSIONS = new Set(['.astro', '.tsx', '.ts', '.css']);
const IGNORE_MARK = 'check-styles-ignore';
const MIN_DUPLICATE_TOKENS = 3;

const CLASS_ATTRIBUTE = /\bclass(?:Name)?=(?:"([^"{}]*)"|'([^'{}]*)')/g;
const STRING_LITERAL = /'([^'\n]+)'|"([^"\n]+)"|`([^`\n$]+)`/g;
const CLASS_TOKEN = /^[\w:\-[\]/.&()!%@*#=>,+]+$/;
const COLOR_LITERAL =
  /(?<![\w&/"'=-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|\b(?:rgba?|hsla?|oklch|oklab|lch|lab)\(/;
const INLINE_STYLE = /\sstyle=/;

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function isIgnored(lines, lineNumber) {
  return (
    lines[lineNumber - 1]?.includes(IGNORE_MARK) || lines[lineNumber - 2]?.includes(IGNORE_MARK)
  );
}

function normalizeTokens(value) {
  return value.split(/\s+/).filter(Boolean);
}

function isArbitraryValue(token) {
  const utility = token.split(':').pop() ?? '';
  return /-\[[^\]]+\]/.test(utility) && !/-\[var\(--/.test(utility);
}

/** Returns all style issues under `<root>/src` as `{ file, line, rule, message }`. */
export function scanStyles(baseDirectory = root) {
  const issues = [];
  const classLists = new Map();
  const sourceFiles = walk(join(baseDirectory, 'src')).filter((file) =>
    STYLE_EXTENSIONS.has(extname(file)),
  );

  for (const absolute of sourceFiles) {
    const file = relative(baseDirectory, absolute).split('\\').join('/');
    const text = readFileSync(absolute, 'utf8');
    const lines = text.split('\n');
    const inTokens = file.startsWith('src/styles/');
    const inUi = file.startsWith('src/components/ui/');
    const isMarkup = file.endsWith('.astro') || file.endsWith('.tsx');
    const report = (line, rule, message) => {
      if (!isIgnored(lines, line)) issues.push({ file, line, rule, message });
    };
    const recordClassList = (value, index) => {
      const tokens = normalizeTokens(value);
      if (tokens.length < MIN_DUPLICATE_TOKENS) return;
      const key = [...tokens].sort().join(' ');
      const line = lineOf(text, index);
      if (isIgnored(lines, line)) return;
      classLists.set(key, [...(classLists.get(key) ?? []), { file, line }]);
    };

    lines.forEach((content, offset) => {
      const line = offset + 1;
      if (isMarkup && INLINE_STYLE.test(content)) {
        report(
          line,
          'no-inline-style',
          'Inline style attribute. Add a variant to a ui component or a token instead.',
        );
      }
      if (!inTokens && COLOR_LITERAL.test(content)) {
        report(
          line,
          'no-color-literal',
          'Color literal. Use a design token from src/styles/global.css.',
        );
      }
    });

    if (isMarkup) {
      for (const match of text.matchAll(CLASS_ATTRIBUTE)) {
        const value = match[1] ?? match[2];
        const line = lineOf(text, match.index);
        const tokens = normalizeTokens(value);
        for (const token of tokens.filter(isArbitraryValue)) {
          report(
            line,
            'no-arbitrary-value',
            `Arbitrary value "${token}". Add a token or scale step instead.`,
          );
        }
        if (!inUi && tokens.length > MAX_INLINE_CLASS_TOKENS) {
          report(
            line,
            'extract-component',
            `${tokens.length} classes inline (max ${MAX_INLINE_CLASS_TOKENS} outside src/components/ui). Extract a ui component or variant.`,
          );
        }
        recordClassList(value, match.index);
      }
    }

    if (file.endsWith('.variants.ts')) {
      for (const match of text.matchAll(STRING_LITERAL)) {
        const value = match[1] ?? match[2] ?? match[3];
        const tokens = normalizeTokens(value);
        if (
          tokens.length >= MIN_DUPLICATE_TOKENS + 1 &&
          tokens.every((token) => CLASS_TOKEN.test(token))
        ) {
          recordClassList(value, match.index);
        }
      }
    }
  }

  for (const [, locations] of classLists) {
    if (locations.length < 2) continue;
    for (const location of locations) {
      const others = locations
        .filter((other) => other !== location)
        .map((other) => `${other.file}:${other.line}`)
        .join(', ');
      issues.push({
        file: location.file,
        line: location.line,
        rule: 'no-duplicate-classes',
        message: `Identical class list also at ${others}. Extract a shared ui component or variant.`,
      });
    }
  }

  return issues.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);
}

export function formatIssues(issues) {
  return issues
    .map((issue) => `  ${issue.file}:${issue.line}  ${issue.rule}  ${issue.message}`)
    .join('\n');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const issues = scanStyles();
  if (issues.length > 0) {
    console.error(`Style check failed (${issues.length}):\n${formatIssues(issues)}`);
    process.exit(1);
  }
  console.log('Style check passed.');
}
