import { getRequestConfig, setRequestConfig } from './index';

test('normal', () => {
  setRequestConfig({ hello: '123' });
  expect(getRequestConfig()).toEqual({ hello: '123' });
});
