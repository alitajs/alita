import { join, relative } from 'path';
import { utils } from 'umi';
import { getModels } from './getModels';

const fixtures = join(__dirname, 'fixtures');

test('getModels', () => {
  const base = join(fixtures, 'normal');
  const models = getModels({
    base,
    cwd: __dirname,
  });
  expect(models.map((m) => relative(base, m))).toEqual([
    'b.js',
    'c.ts',
    'e.jsx',
    'f.tsx',
  ]);
});

test('getModels with opts.skipModelValidate', () => {
  const base = join(fixtures, 'skipModelValidate');
  const models = getModels({
    base,
    cwd: __dirname,
    skipModelValidate: true,
  });
  expect(models.map((m) => relative(base, m))).toEqual(['no_content.js']);
});

test('getModels with opts.extraModels', () => {
  const base = join(fixtures, 'extraModels');
  const models = getModels({
    base,
    cwd: __dirname,
    extraModels: [
      join(base, '..', 'models-for-extraModels', 'a_valid.js'),
      join(base, '..', 'models-for-extraModels', 'b_invalid.js'),
    ],
  });
  expect(
    models.map((m) => utils.winPath(relative(join(base, '..'), m))),
  ).toEqual(['models-for-extraModels/a_valid.js']);
});

test('getModels with opts.extraModels and opts.skipModelValidate', () => {
  const base = join(fixtures, 'extraModels');
  const models = getModels({
    base,
    cwd: __dirname,
    extraModels: [
      join(base, '..', 'models-for-extraModels', 'a_valid.js'),
      join(base, '..', 'models-for-extraModels', 'b_invalid.js'),
    ],
    skipModelValidate: true,
  });
  expect(
    models.map((m) => utils.winPath(relative(join(base, '..'), m))),
  ).toEqual([
    'models-for-extraModels/a_valid.js',
    'models-for-extraModels/b_invalid.js',
  ]);
});

test('parser error when has jsx', () => {
  const base = join(fixtures, 'jsx');
  const filePath = join(base, 'a.jsx');
  expect(() => {
    getModels({
      base,
      cwd: __dirname,
      skipModelValidate: false,
    });
  }).toThrow(
    `Dva model ${utils.winPath(
      relative(__dirname, filePath),
    )} parse failed, SyntaxError: Unterminated regular expression. (3:26)`,
  );
});
