// Claude Code PreToolUse hook for Bash. Exit code 2 blocks the command and shows stderr to Claude.
// Enforces commit message format, branch names, and the no-direct-commit-to-main rule.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { PROTECTED_BRANCHES, validateBranchName, validateCommitHeader } from '../conventions.mjs';

const input = JSON.parse(readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';
const problems = [];

function currentBranch() {
  if (process.env.HOOK_TEST_BRANCH !== undefined) return process.env.HOOK_TEST_BRANCH; // test seam
  try {
    return execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function commitHeader() {
  const heredoc = command.match(/<<-?\s*['"]?(\w+)['"]?\n([^\n]*)/);
  if (heredoc) return heredoc[2].trim();
  const quoted = command.match(/(?:-m|--message(?:=|\s+))\s*(?:"((?:[^"\\]|\\.)*)"|'([^']*)')/);
  return quoted ? (quoted[1] ?? quoted[2]).split('\n')[0].trim() : null;
}

const isCommit = /\bgit\s+(?:-C\s+\S+\s+)?commit\b/.test(command);
const isPush = /\bgit\s+(?:-C\s+\S+\s+)?push\b/.test(command);

if ((isCommit || isPush) && /--no-verify\b/.test(command)) {
  problems.push('Do not skip git hooks (--no-verify). Fix the underlying problem instead.');
}

if (isCommit) {
  if (PROTECTED_BRANCHES.includes(currentBranch())) {
    problems.push(
      'Do not commit on main. Create a branch first, for example: git switch -c feat/my-change',
    );
  }
  const header = commitHeader();
  if (header) problems.push(...validateCommitHeader(header));
}

if (isPush) {
  if (/--force(?!-with-lease)|\s-f\b/.test(command))
    problems.push('Do not force-push. Use --force-with-lease only when the user asks.');
  const target = new RegExp(
    `\\bgit\\s+push\\b[^;&|]*\\s(?:HEAD:)?(${PROTECTED_BRANCHES.join('|')})\\b`,
  );
  if (target.test(command)) problems.push('Do not push directly to main. Open a pull request.');
}

const branchPatterns = [
  /\bgit\s+checkout\s+-[bB]\s+([^\s;&|]+)/,
  /\bgit\s+switch\s+(?:-c|-C|--create)\s+([^\s;&|]+)/,
  /\bgit\s+branch\s+(?!-)([^\s;&|]+)/,
  /\bgit\s+worktree\s+add\s+(?:\S+\s+)*-b\s+([^\s;&|]+)/,
];
for (const pattern of branchPatterns) {
  const name = command.match(pattern)?.[1]?.replace(/^["']|["']$/g, '');
  if (name) problems.push(...validateBranchName(name));
}

if (problems.length > 0) {
  console.error(
    `Blocked by repo conventions (docs/conventions.md):\n${problems.map((problem) => `  - ${problem}`).join('\n')}`,
  );
  process.exit(2);
}
