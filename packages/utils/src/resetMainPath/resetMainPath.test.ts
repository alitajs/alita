import resetMainPath from './resetMainPath';

test('resetMainPath', () => {
  const routes = [
    {
      path: '/abc',
    },
    {
      path: '/',
    },
    {
      path: '/home',
    },
  ] as any;
  const mainPath = '/home';
  expect(resetMainPath(routes, mainPath)).toEqual([
    { path: '/abc' },
    { path: '/index' },
    { path: '/' },
  ]);
});
