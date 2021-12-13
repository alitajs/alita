import { Mustache, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';

const DIR_NAME = 'mobile-layout';

export default (api: AlitaApi) => {
  api.describe({
    key: 'mobileLayout',
    config: {
      default: {},
      schema(Joi) {
        return Joi.boolean();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
  });
  if (!api.userConfig.mobileLayout) return;
  const isMicroApp = api.userConfig.appType === 'micro';

  // 注册runtime配置
  api.addRuntimePluginKey(() => ['mobileLayout']);

  api.onGenerateFiles(() => {
    const layoutTpl = readFileSync(
      join(__dirname, '..', 'templates', 'mobile-layout', 'layout.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'Layout.tsx'),
      noPluginDir: true,
      content: Mustache.render(layoutTpl, {
        alitalayout: winPath(
          dirname(require.resolve('@alita/alita-layout/package')),
        ),
        alitarequest: winPath(
          dirname(require.resolve('@alita/request/package')),
        ),
      }),
    });

    const contentTpl = readFileSync(
      join(__dirname, '..', 'templates', 'mobile-layout', 'content.tpl'),
      'utf-8',
    );

    api.writeTmpFile({
      path: join(DIR_NAME, 'AlitaLayout.tsx'),
      noPluginDir: true,
      content: Mustache.render(contentTpl, {
        path: winPath(join(api.paths.absTmpPath || '', DIR_NAME, 'Layout.tsx')),
        hasKeepAlive: !!api.userConfig.keepalive,
        isMicroApp,
      }),
    });

    const modelTpl = readFileSync(
      join(__dirname, '..', 'templates', 'mobile-layout', 'model.tpl'),
      'utf-8',
    );

    api.writeTmpFile({
      path: join(DIR_NAME, 'layoutState.ts'),
      noPluginDir: true,
      content: Mustache.render(modelTpl, {
        alitalayout: winPath(
          dirname(require.resolve('@alita/alita-layout/package')),
        ),
      }),
    });

    api.writeTmpFile({
      path: join(DIR_NAME, 'exports.ts'),
      noPluginDir: true,
      content: `export { getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter } from './layoutState';`,
    });
  });
  // TODO: modifyRoutes
  // api.modifyRoutes((routes) => [
  //   {
  //     path: '/',
  //     component: winPath(
  //       join(api.paths.absTmpPath || '', DIR_NAME, 'AlitaLayout.tsx'),
  //     ),
  //     routes,
  //   },
  // ]);

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: join('..', DIR_NAME, 'exports.ts'),
    },
    {
      exportAll: true,
      source: winPath(dirname(require.resolve('@alita/alita-layout/package'))),
    },
  ]);
};
