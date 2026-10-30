// Claude Code PostToolUse hook for Write and Edit.
// Formats the edited file, then checks its name and its styles. Exit code 2 reports problems to Claude.
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { formatIssues, scanStyles } from '../check-styles.mjs';
import { validateFilePath } from '../conventions.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../../..');
const FORMATTABLE = new Set([
  '.astro',
  '.ts',
  '.tsx',
  '.mjs',
  '.js',
  '.css',
  '.json',
  '.md',
  '.yaml',
  '.yml',
]);
const STYLE_CHECKED = new Set(['.astro', '.ts', '.tsx', '.css']);

const input = JSON.parse(readFileSync(0, 'utf8'));
const absolute = input.tool_input?.file_path;
if (!absolute) process.exit(0);

const file = relative(root, absolute).split('\\').join('/');
if (file.startsWith('..') || !existsSync(absolute)) process.exit(0);

const problems = [...validateFilePath(file)];
const extension = extname(file);

if (FORMATTABLE.has(extension)) {
  try {
    execFileSync(
      join(root, 'node_modules/.bin/prettier'),
      ['--write', '--log-level', 'warn', absolute],
      {
        cwd: root,
        stdio: 'pipe',
      },
    );
  } catch (error) {
    problems.push(
      `Prettier could not format ${file}:\n${String(error.stderr ?? error.message).trim()}`,
    );
  }
}

if (STYLE_CHECKED.has(extension) && file.startsWith('src/')) {
  const issues = scanStyles(root).filter((issue) => issue.file === file);
  if (issues.length > 0) problems.push(`Style problems in ${file}:\n${formatIssues(issues)}`);
}

if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(2);
}
