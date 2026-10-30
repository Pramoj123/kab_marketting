// Single source of truth for repo conventions.
// Imported by git hooks, Claude Code hooks, CI and tests. Change rules here only.

export const COMMIT_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'content',
  'revert',
];

export const COMMIT_SCOPES = [
  'ui',
  'sections',
  'layouts',
  'pages',
  'cms',
  'content',
  'seo',
  'styles',
  'forms',
  'analytics',
  'config',
  'deps',
  'ci',
  'tests',
  'docs',
  'claude',
  'scripts',
];

export const BRANCH_TYPES = [
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'perf',
  'test',
  'build',
  'ci',
  'chore',
  'content',
  'hotfix',
];

export const PROTECTED_BRANCHES = ['main'];
export const COMMIT_HEADER_MAX_LENGTH = 72;
export const BRANCH_MAX_LENGTH = 60;
export const MAX_INLINE_CLASS_TOKENS = 6;

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const PASCAL = /^[A-Z][A-Za-z0-9]*$/;
const ROUTE_PARAM = /^\[(?:\.\.\.)?[A-Za-z][A-Za-z0-9]*\]$/;
const SKIPPED_COMMIT_PREFIXES = ['Merge ', 'Revert "', 'fixup! ', 'squash! '];

const NAMED_ROOTS = ['src', 'scripts', 'tests', 'docs', 'public'];
const COMPONENT_EXTENSIONS = new Set(['astro', 'tsx', 'jsx']);
const ALLOWED_MIDDLE_EXTENSIONS = new Set(['test', 'spec', 'config', 'd', 'variants', 'schema']);
// Astro endpoints name their output type, for example robots.txt.ts or feed.xml.ts.
const ENDPOINT_MIDDLE_EXTENSIONS = new Set(['txt', 'xml', 'json']);

const COMMIT_EXAMPLE = 'feat(ui): add button variants';
const BRANCH_EXAMPLE = 'feat/add-pricing-section';

/** @param {string} header First line of a commit message. @returns {string[]} */
export function validateCommitHeader(header) {
  if (SKIPPED_COMMIT_PREFIXES.some((prefix) => header.startsWith(prefix))) return [];

  const match = header.match(/^([a-z]+)(?:\(([a-z-]+)\))?(!)?: (.+)$/);
  if (!match) {
    return [
      `Commit header must be "<type>(<scope>): <subject>", for example "${COMMIT_EXAMPLE}". Got: "${header}"`,
    ];
  }

  const [, type, scope, , subject] = match;
  const errors = [];
  if (!COMMIT_TYPES.includes(type)) {
    errors.push(`Unknown type "${type}". Allowed: ${COMMIT_TYPES.join(', ')}.`);
  }
  if (scope && !COMMIT_SCOPES.includes(scope)) {
    errors.push(`Unknown scope "${scope}". Allowed: ${COMMIT_SCOPES.join(', ')}.`);
  }
  if (header.length > COMMIT_HEADER_MAX_LENGTH) {
    errors.push(`Header is ${header.length} characters, the limit is ${COMMIT_HEADER_MAX_LENGTH}.`);
  }
  if (!/^[a-z0-9]/.test(subject))
    errors.push('Subject must start with a lowercase letter or digit.');
  if (subject.endsWith('.')) errors.push('Subject must not end with a period.');
  return errors;
}

/** @param {string} name Branch name. @returns {string[]} */
export function validateBranchName(name) {
  if (PROTECTED_BRANCHES.includes(name)) return [];

  const pattern = new RegExp(`^(${BRANCH_TYPES.join('|')})/(?:[0-9]+-)?[a-z0-9]+(?:-[a-z0-9]+)*$`);
  const errors = [];
  if (!pattern.test(name)) {
    errors.push(
      `Branch must be "<type>/<kebab-description>" (optional ticket number first), for example "${BRANCH_EXAMPLE}". Types: ${BRANCH_TYPES.join(', ')}. Got: "${name}"`,
    );
  }
  if (name.length > BRANCH_MAX_LENGTH) {
    errors.push(`Branch name is ${name.length} characters, the limit is ${BRANCH_MAX_LENGTH}.`);
  }
  return errors;
}

/**
 * Validates one repo-relative path against the naming rules.
 * Paths outside the named roots are not checked.
 * @param {string} relPath Repo-relative path using forward slashes.
 * @returns {string[]}
 */
export function validateFilePath(relPath) {
  const parts = relPath.split('/');
  const [root, second] = parts;

  if (root === '.claude' && (second === 'skills' || second === 'agents')) {
    return validateClaudePath(parts);
  }
  if (!NAMED_ROOTS.includes(root)) return [];

  const inPages = root === 'src' && second === 'pages';
  const errors = [];

  for (const folder of parts.slice(1, -1)) {
    const valid = KEBAB.test(folder) || (inPages && ROUTE_PARAM.test(folder));
    if (!valid) errors.push(`Folder "${folder}" in ${relPath} must be kebab-case.`);
  }

  const fileName = parts.at(-1);
  // Dotfiles (.gitkeep) and underscore files (public/_redirects, public/_headers) are tool-defined names.
  if (fileName.startsWith('.') || (root === 'public' && fileName.startsWith('_'))) return errors;

  const match = fileName.match(/^(\[[^\]]+\]|[^.]+)((?:\.[^.]+)*)$/);
  if (!match) return [...errors, `File name "${fileName}" in ${relPath} is not valid.`];

  const [, base, rest] = match;
  const extensions = rest.split('.').filter(Boolean);
  const extension = extensions.at(-1) ?? '';
  const middles = extensions.slice(0, -1);

  if (COMPONENT_EXTENSIONS.has(extension) && !inPages) {
    if (!PASCAL.test(base) || middles.length > 0) {
      errors.push(
        `Component file "${fileName}" in ${relPath} must be PascalCase, for example "Button.astro".`,
      );
    }
    return errors;
  }

  const baseValid = KEBAB.test(base) || (inPages && ROUTE_PARAM.test(base));
  if (!baseValid) errors.push(`File "${fileName}" in ${relPath} must be kebab-case.`);
  for (const middle of middles) {
    const allowed =
      ALLOWED_MIDDLE_EXTENSIONS.has(middle) || (inPages && ENDPOINT_MIDDLE_EXTENSIONS.has(middle));
    if (!allowed) {
      errors.push(
        `File "${fileName}" in ${relPath} has unexpected ".${middle}". Allowed: ${[...ALLOWED_MIDDLE_EXTENSIONS].join(', ')}.`,
      );
    }
  }
  return errors;
}

function validateClaudePath(parts) {
  const errors = [];
  const [, kind, ...rest] = parts;
  if (kind === 'skills') {
    if (rest.length === 2) {
      if (!KEBAB.test(rest[0])) errors.push(`Skill folder "${rest[0]}" must be kebab-case.`);
      if (rest[1] !== 'SKILL.md' && !KEBAB.test(rest[1].replace(/\.[^.]+$/, ''))) {
        errors.push(`Skill file "${rest[1]}" must be SKILL.md or kebab-case.`);
      }
    }
  } else if (rest.length === 1 && !KEBAB.test(rest[0].replace(/\.md$/, ''))) {
    errors.push(`Agent file "${rest[0]}" must be kebab-case.`);
  }
  return errors;
}
