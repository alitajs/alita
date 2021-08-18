import { join } from 'path';
import { utils } from 'umi';
import { fireEvent, getByText, cleanup } from '@testing-library/react';
import { generateTmp, render } from '@umijs/test-utils';

const fixtures = join(__dirname, 'fixtures');

afterEach(cleanup);

test('normal', async () => {
  const cwd = join(fixtures, 'normal');
  await generateTmp({ cwd });
  const { container } = render({ cwd });
  expect(container.innerHTML).toEqual(
    '<div><h1 class="title">Page index foo 0</h1></div>',
  );
});

test('page models', async () => {
  const cwd = join(fixtures, 'page-models');
  await generateTmp({ cwd });
  const { container } = render({ cwd });
  expect(container.innerHTML).toEqual(
    '<div><h1 class="title">Page index foo 0 bar 1</h1></div>',
  );
});

test('with-immer', async () => {
  const cwd = join(fixtures, 'with-immer');
  await generateTmp({ cwd });
  const { container } = render({ cwd });
  expect(container.innerHTML).toEqual(
    '<div><h1 class="title">Page index foo 0</h1><button>add</button></div>',
  );
  fireEvent.click(getByText(container, 'add'));
  await utils.delay(100);
  expect(container.innerHTML).toEqual(
    '<div><h1 class="title">Page index foo 1</h1><button>add</button></div>',
  );
});

test('lazyLoad', async () => {
  const cwd = join(fixtures, 'lazyLoad');
  await generateTmp({ cwd });
  const { container } = render({ cwd });
  await utils.delay(100);
  expect(container.innerHTML).toEqual(
    '<div><h1 class="title">Page index foo 0</h1></div>',
  );
});
