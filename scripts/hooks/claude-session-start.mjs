// Claude Code SessionStart hook. Stdout is added to the session context.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROTECTED_BRANCHES } from '../conventions.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../../..');
const lines = [
  'Repo conventions are in docs/conventions.md. Check scripts/conventions.mjs for the exact rules.',
];

const wanted = readFileSync(resolve(root, '.nvmrc'), 'utf8').trim();
if (process.versions.node !== wanted) {
  lines.push(
    `Node is ${process.versions.node} but .nvmrc pins ${wanted}. Run: source "$NVM_DIR/nvm.sh" && nvm use`,
  );
}

try {
  const branch = execFileSync('git', ['branch', '--show-current'], {
    cwd: root,
    encoding: 'utf8',
  }).trim();
  if (PROTECTED_BRANCHES.includes(branch)) {
    lines.push(
      `You are on "${branch}". Create a branch before changing files: git switch -c <type>/<kebab-description>`,
    );
  }
} catch {
  // not a git checkout
}

console.log(lines.join('\n'));
