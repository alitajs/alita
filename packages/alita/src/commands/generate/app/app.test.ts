import { Env, Service } from '@umijs/core';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';
import { join } from 'path';

const fixtrues = join(__dirname, '../../../../fixtures');
const cwd = join(fixtrues, 'generate');

async function runGenerator(args: any) {
  const service = new Service({
    cwd,
    env: Env.test,
    plugins: [require.resolve('./app')],
  });

  await service.run({
    name: 'generate',
    args,
  });
}

test('generate app', async () => {
  await runGenerator({
    _: ['generate', 'app', 'hello'],
  });

  expect(existsSync(join(cwd, './hello/src/pages/index/index.tsx'))).toEqual(
    true,
  );
  expect(existsSync(join(cwd, './hello/package.json'))).toEqual(true);
  rimraf.sync(join(cwd, 'hello'));
});
