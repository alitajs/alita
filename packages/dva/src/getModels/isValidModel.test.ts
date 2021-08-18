import { isValidModel } from './isValidModel';

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

test('isValidModel with TypeScript', () => {
  expect(
    isValidModel({
      content: `export default <Model>{ namespace: 'foo' };`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `const foo = <Model>{ namespace: 'foo' };export default foo;`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default { namespace: 'foo' } as Model;`,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `export default <DvaModel<SurveyState>>{ namespace: 'foo' };`,
    }),
  ).toEqual(true);
});

test('isValidModel support dva-model-extend', () => {
  expect(
    isValidModel({
      content: `
import foo from 'dva-model-extend';
export default foo(model, { namespace: 'foo' });
      `,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `
import foo from 'dva-model-extend';
const m = { namespace: 'foo' };
export default foo(model, m);
      `,
    }),
  ).toEqual(true);
  expect(
    isValidModel({
      content: `
import foo from 'bar';
export default foo(model, { namespace: 'foo' });
      `,
    }),
  ).toEqual(false);
});
