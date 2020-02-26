import { join } from 'path';
import { getModels, isValidModel } from './getModels';

const fixtures = join(__dirname, 'fixtures');

test('getModels', () => {
  const models = getModels({
    base: join(fixtures, 'normal'),
  });
  expect(models).toEqual(['b.js', 'c.ts', 'e.jsx', 'f.tsx']);
});

test('isValidModel', () => {
  expect(
    isValidModel({
      content: `export default { state: {} }`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default { reducers: {} }`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default { effects: {} }`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default { subscriptions: {} }`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default {  }`,
    }),
  ).toEqual(false);
});

test('isValidModel with variable declaration', () => {
  expect(
    isValidModel({
      content: `const Foo = { state: {} }; export default Foo;`,
    }),
  ).toEqual(true);
});
