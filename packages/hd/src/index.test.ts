import { join } from 'path';
import { readFileSync } from 'fs';
import { Service } from 'umi';
import { render, fireEvent, cleanup } from '@testing-library/react';

const fixtures = join(__dirname, 'fixtures');

afterEach(cleanup);

test('normal', async () => {
  const cwd = join(fixtures, 'normal');
  const service = new Service({
    cwd,
    plugins: [require.resolve('../lib/index.js')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'tmp'],
    },
  });

  const reactNode = require(join(cwd, 'src', '.umi-test', 'umi.ts')).default;
  const { container } = render(reactNode);

  expect(container.querySelector('h1')?.textContent).toEqual('hello hd');
});

test('custom-hd', async () => {
  const cwd = join(fixtures, 'custom-hd');
  const service = new Service({
    cwd,
    plugins: [require.resolve('../lib/index.js')],
  });
  await service.run({
    name: 'g',
    args: {
      _: ['g', 'tmp'],
    },
  });

  const reactNode = require(join(cwd, 'src', '.umi-test', 'umi.ts')).default;
  const { container } = render(reactNode);

  expect(container.querySelector('h1')?.textContent).toEqual('hello hd');
});
