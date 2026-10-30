// Validates a branch name. Usage:
//   node scripts/validate-branch-name.mjs [name]      (defaults to the current branch)
//   node scripts/validate-branch-name.mjs --no-commit-on-protected   (pre-commit hook)
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PROTECTED_BRANCHES, validateBranchName } from './conventions.mjs';

function currentBranch() {
  return execFileSync('git', ['branch', '--show-current'], { encoding: 'utf8' }).trim();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const blockProtected = args.includes('--no-commit-on-protected');
  const name = args.find((arg) => !arg.startsWith('--')) ?? currentBranch();

  if (!name) process.exit(0); // detached HEAD, for example during a rebase

  if (blockProtected && PROTECTED_BRANCHES.includes(name)) {
    console.error(
      `Do not commit directly to "${name}". Create a branch first, for example: git switch -c feat/my-change`,
    );
    process.exit(1);
  }
  const errors = validateBranchName(name);
  if (errors.length > 0) {
    console.error(`Branch name check failed:\n${errors.map((error) => `  - ${error}`).join('\n')}`);
    process.exit(1);
  }
}
