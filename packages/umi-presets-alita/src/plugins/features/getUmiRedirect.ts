// copy form umi/packages/preset-built-in/src/plugins/features/ (MIT)

import { init, parse } from 'es-module-lexer';
import { readFileSync } from 'fs';
import { join } from 'path';
import { winPath } from '@umijs/utils';
import { dirname } from 'path';

export const runtimePath = winPath(
  dirname(require.resolve('@umijs/runtime/package.json')),
);

export async function getUmiRedirect(umiDir: string) {
  const distFile = join(umiDir, 'index.esm.js');
  const content = readFileSync(distFile, 'utf-8');

  await init;
  const [_, exports] = parse(content);
  return exports.reduce((memo, key) => {
    memo[key] = runtimePath;
    return memo;
  }, {});
}
