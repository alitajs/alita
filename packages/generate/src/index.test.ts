import { Service } from 'umi';
import { join } from 'path';
import { rimraf } from '@umijs/utils';
import { existsSync } from 'fs';

const fixtures = join(__dirname, './fixtures');
const cwd = join(fixtures, 'generate');

async function runGenerator(args: any) {
  const service = new Service({
    cwd,
    plugins: [require.resolve('./index.ts')],
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
  expect(
    existsSync(join(cwd, 'hello', 'src', 'pages', 'index', 'index.tsx')),
  ).toEqual(true);
  expect(
    existsSync(join(cwd, 'hello', 'src', 'pages', 'list', 'index.less')),
  ).toEqual(true);
  rimraf.sync(join(cwd, 'hello'));
});

test('generate page', async () => {
  await runGenerator({
    _: ['generate', 'pages', 'index'],
  });
  expect(existsSync(join(cwd, 'pages', 'index', 'index.tsx'))).toEqual(true);
  expect(existsSync(join(cwd, 'pages', 'index', 'index.less'))).toEqual(true);
  rimraf.sync(join(cwd, 'pages'));
  rimraf.sync(join(cwd, 'models'));
});

test('generate model', async () => {
  await runGenerator({
    _: ['generate', 'model', 'index'],
  });
  expect(existsSync(join(cwd, 'models', 'index.ts'))).toEqual(true);
  rimraf.sync(join(cwd, 'models'));
});
