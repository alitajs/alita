import type { AlitaApi } from '@alita/types';
import { logger, Mustache } from '@umijs/utils';

import { readFileSync } from 'fs';
import { join } from 'path';

const DIR_NAME = 'plugin-keepalive';
// keepalive:['route path','route path']
// import { KeepAliveContext } from '@@/plugin-keepalive/context';
// const { dropByCacheKey } = React.useContext<any>(KeepAliveContext);
// dropByCacheKey('/list');
type KeepAliveType = (string | RegExp)[];
export default (api: AlitaApi) => {
  // 和 tabsLayout 插件组合使用
  const { tabsLayout } = api.userConfig;

  api.describe({
    key: 'keepalive',
    config: {
      schema(Joi) {
        return Joi.array().items(Joi.alternatives(Joi.string(), Joi.any()));
      },
    },
    enableBy: api.EnableBy.config,
  });
  api.addRuntimePluginKey(() => 'getKeepAlive');

  // only dev or build running
  if (!['dev', 'build'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using KeepAlive Plugin');
  });
  const configStringify = (config: (string | RegExp)[]) => {
    return config.map((item) => {
      if (item instanceof RegExp) {
        return item;
      }
      return `'${item}'`;
    });
  };
  api.onGenerateFiles(() => {
    const contextTpl = readFileSync(
      join(__dirname, '..', 'templates', 'keepalive', 'context.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: `${DIR_NAME}/context.tsx`,
      noPluginDir: true,
      content: Mustache.render(contextTpl, {
        hasTabsLayout: !!tabsLayout,
        hasCustomTabs: !!tabsLayout?.hasCustomTabs,
        hasGetKeepalive: api.appData.appJS?.exports.includes('getKeepAlive'),
      }),
    });
    const runtimeTpl = readFileSync(
      join(__dirname, '..', 'templates', 'keepalive', 'runtime.tpl'),
      'utf-8',
    );
    api.writeTmpFile({
      path: `${DIR_NAME}/runtime.tsx`,
      noPluginDir: true,
      content: Mustache.render(runtimeTpl, {
        keepalive: configStringify(
          (api.userConfig.keepalive as KeepAliveType) || [],
        ),
      }),
    });

    // index.ts for export
    api.writeTmpFile({
      noPluginDir: true,
      path: `${DIR_NAME}/index.tsx`,
      content: `
export { KeepAliveContext,useKeepOutlets } from './context';
`,
    });
  });

  api.addRuntimePlugin(() => [
    join(api.paths.absTmpPath!, `${DIR_NAME}/runtime.tsx`),
  ]);
};
