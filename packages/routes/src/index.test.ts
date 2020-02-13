import { join } from 'path';
import { Service } from 'umi';
import { Route } from '@umijs/core';

const fixtures = join(__dirname, 'fixtures');

test('exclude', async () => {
  const cwd = join(fixtures, 'exclude');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./')],
  });
  await service.init();
  const route = new Route();
  const routes = await service.applyPlugins({
    key: 'modifyRoutes',
    type: service.ApplyPluginsType.modify,
    initialValue: await route.getRoutes({
      config: {},
      root: join(cwd, 'pages'),
    }),
  });
  expect(routes).toEqual([
    { component: '@/pages/index.tsx', exact: true, path: '/' },
  ]);
});

test('update', async () => {
  const cwd = join(fixtures, 'update');
  const service = new Service({
    cwd,
    plugins: [require.resolve('./')],
  });
  await service.init();
  const route = new Route();
  const routes = await service.applyPlugins({
    key: 'modifyRoutes',
    type: service.ApplyPluginsType.modify,
    initialValue: await route.getRoutes({
      config: {},
      root: join(cwd, 'pages'),
    }),
  });
  expect(routes).toEqual([
    { component: '@/pages/index.tsx', exact: true, path: '/' },
  ]);
});
