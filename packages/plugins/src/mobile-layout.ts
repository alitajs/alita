import { logger, Mustache, winPath } from '@umijs/utils';
import { AlitaApi } from 'alita';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { withTmpPath } from './utils/withTmpPath';

const DIR_NAME = 'mobile-layout';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using Mobile Layout Plugin');
  });
  api.describe({
    key: 'mobileLayout',
    config: {
      schema(Joi) {
        return Joi.boolean();
      },
      onChange: api.ConfigChangeType.regenerateTmpFiles,
    },
    enableBy: api.EnableBy.config,
  });
  // 注册runtime配置
  api.addRuntimePluginKey(() => ['mobileLayout']);
  const isMicroApp = api.userConfig.appType === 'micro';

  api.onGenerateFiles(() => {
    const layoutTpl = readFileSync(
      join(__dirname, '..', 'templates', 'mobile-layout', 'layout.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: join(DIR_NAME, 'AlitaLayout.tsx'),
      noPluginDir: true,
      content: Mustache.render(layoutTpl, {
        alitalayout: winPath(
          dirname(require.resolve('@alita/alita-layout/package')),
        ),
        alitarequest: winPath(
          dirname(require.resolve('@alita/request/package')),
        ),
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

    // api.writeTmpFile({
    //   path: join(DIR_NAME, 'exports.ts'),
    //   noPluginDir: true,
    //   content: `export { getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter } from './layoutState';`,
    // });

    // index.ts for layout
    api.writeTmpFile({
      path: join(DIR_NAME, 'index.ts'),
      noPluginDir: true,
      content: `
      export { getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter } from './layoutState';
      export * from '${winPath(
        dirname(require.resolve('@alita/alita-layout/package')),
      )}'
      `,
    });
  });

  api.addLayouts(() => {
    return [
      {
        id: 'alita-layout',
        file: withTmpPath({
          api,
          noPluginDir: true,
          path: join(DIR_NAME, 'AlitaLayout.tsx'),
        }),
      },
    ];
  });
};
