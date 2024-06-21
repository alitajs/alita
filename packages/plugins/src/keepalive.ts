import type { AlitaApi } from '@alita/types';
import { Mustache } from '@umijs/utils';

import { readFileSync } from 'fs';
import { join } from 'path';
import { checkAntdVersion } from './utils/checkAntd';

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
  if (
    !['dev', 'build', 'dev-config', 'preview', 'setup', 'setup'].includes(
      api.name,
    )
  )
    return;

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
    const hasInitialStatePlugin = api.config.initialState;

    api.writeTmpFile({
      path: `${DIR_NAME}/context.tsx`,
      noPluginDir: true,
      content: Mustache.render(contextTpl, {
        hasTabsLayout: !!tabsLayout,
        hasCustomTabs: !!tabsLayout?.hasCustomTabs,
        hasDropdown: !!tabsLayout?.hasDropdown,
        hasFixedHeader: !!tabsLayout?.hasFixedHeader,
        isPluginModelEnable: hasInitialStatePlugin,
        hasIntl: !!api.config.locale,
        isNewTabsAPISupported: checkAntdVersion(api, '4.22.8', '4.23.0'),
        isNewDropdownAPISupported: checkAntdVersion(api, '4.23.6', '4.24.0'),
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
        hasTabsLayout: !!tabsLayout,
        keepalive: configStringify(
          (api.userConfig.keepalive as KeepAliveType) || [],
        ),
        hasGetKeepalive: api.appData.appJS?.exports.includes('getKeepAlive'),
      }),
    });
    api.writeTmpFile({
      path: `${DIR_NAME}/support.tsx`,
      noPluginDir: true,
      content: `
import { keepaliveEmitter } from './context';

export function dropByCacheKey(path: string) {
  keepaliveEmitter.emit({type:'dropByCacheKey', payload: {
    path
  }});
}
export function closeTab(path: string) {
  keepaliveEmitter.emit({type:'closeTab', payload: {
    path
  }});
}
export function closeAllTabs() {
  keepaliveEmitter.emit({type:'closeAllTabs'});
}
`,
    });
    // index.ts for export
    api.writeTmpFile({
      noPluginDir: true,
      path: `${DIR_NAME}/index.tsx`,
      content: `
export { KeepAliveContext, type KeepAliveContextProps, useKeepOutlets } from './context';
export { dropByCacheKey, closeTab, closeAllTabs } from './support';
`,
    });
  });

  api.addRuntimePlugin(() => [
    join(api.paths.absTmpPath!, `${DIR_NAME}/runtime.tsx`),
  ]);
};
