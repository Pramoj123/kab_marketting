// Validates commit messages. Usage:
//   node scripts/validate-commit-msg.mjs <message-file>      (git commit-msg hook)
//   node scripts/validate-commit-msg.mjs --range <a>..<b>    (CI)
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateCommitHeader } from './conventions.mjs';

function headersFromArguments(args) {
  if (args[0] === '--range') {
    const output = execFileSync('git', ['log', '--format=%s', args[1]], { encoding: 'utf8' });
    return output.split('\n').filter(Boolean);
  }
  const message = readFileSync(args[0], 'utf8');
  const header = message.split('\n').find((line) => line.trim() !== '' && !line.startsWith('#'));
  return header ? [header] : [];
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const headers = headersFromArguments(process.argv.slice(2));
  const failures = headers.flatMap((header) =>
    validateCommitHeader(header).map((error) => `  "${header}"\n    ${error}`),
  );
  if (failures.length > 0) {
    console.error(`Commit message check failed:\n${failures.join('\n')}`);
    process.exit(1);
  }
}
