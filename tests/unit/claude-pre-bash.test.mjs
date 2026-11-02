import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const HOOK = 'scripts/hooks/claude-pre-bash.mjs';

function run(command, branch = 'feat/current-work') {
  const result = spawnSync('node', [HOOK], {
    input: JSON.stringify({ tool_name: 'Bash', tool_input: { command } }),
    encoding: 'utf8',
    env: { ...process.env, HOOK_TEST_BRANCH: branch },
  });
  return { blocked: result.status === 2, message: result.stderr };
}

const allowed = (command, branch) =>
  assert.equal(run(command, branch).blocked, false, `expected allowed: ${command}`);
const blocked = (command, branch) =>
  assert.equal(run(command, branch).blocked, true, `expected blocked: ${command}`);

test('commit messages', () => {
  allowed('git commit -m "feat(ui): add button variants"');
  allowed("git commit -m 'fix: handle empty slug'");
  allowed('git commit -m "$(cat <<\'EOF\'\nfeat(seo): add json-ld\n\nBody text.\nEOF\n)"');
  blocked('git commit -m "added a button"');
  blocked('git commit -m "feat(nope): add button"');
  blocked('git commit -m "$(cat <<\'EOF\'\nAdded stuff\nEOF\n)"');
});

test('no commits or pushes to main', () => {
  blocked('git commit -m "feat(ui): add button"', 'main');
  blocked('git push origin main');
  blocked('git push --force origin feat/x');
  allowed('git push --force-with-lease origin feat/x');
  allowed('git push -u origin feat/x');
});

test('hooks cannot be skipped', () => {
  blocked('git commit --no-verify -m "feat(ui): add button"');
  blocked('git push --no-verify');
});

test('branch names, including quoted ones', () => {
  allowed('git switch -c feat/add-pricing');
  allowed('git checkout -b fix/123-broken-nav');
  allowed('git switch -c "content/spring-campaign"');
  blocked('git switch -c MyBranch');
  blocked("git switch -c 'my_branch'");
  blocked('git checkout -b feature/x');
  blocked('git branch add-pricing');
  allowed('git branch -d feat/old');
});

test('unrelated commands pass', () => {
  allowed('pnpm build && ls');
  allowed('git status');
  allowed('git log --oneline');
});
