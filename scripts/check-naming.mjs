// Validates file and folder names of every tracked or untracked (not ignored) file.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateFilePath } from './conventions.mjs';

const root = resolve(fileURLToPath(import.meta.url), '../..');

export function listRepoFiles() {
  const output = execFileSync('git', ['ls-files', '-co', '--exclude-standard'], {
    cwd: root,
    encoding: 'utf8',
  });
  return output
    .split('\n')
    .filter(Boolean)
    .filter((file) => existsSync(resolve(root, file)));
}

export function checkNaming(files = listRepoFiles()) {
  return files.flatMap((file) => validateFilePath(file));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const errors = checkNaming();
  if (errors.length > 0) {
    console.error(`Naming check failed:\n${errors.map((error) => `  - ${error}`).join('\n')}`);
    process.exit(1);
  }
  console.log('Naming check passed.');
}
