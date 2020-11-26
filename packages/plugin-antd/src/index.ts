import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { IApi, utils } from 'umi';
import { ConfigProviderProps } from 'antd/es/config-provider';

const { Mustache } = utils;

interface IAntdOpts {
  dark?: boolean;
  compact?: boolean;
  config?: ConfigProviderProps;
}

export default (api: IApi) => {
  api.describe({
    config: {
      schema(joi) {
        return joi.object({
          dark: joi.boolean(),
          compact: joi.boolean(),
          config: joi.object(),
        });
      },
    },
  });

  // 如果是微应用，则全量引入 antd
  if (api.userConfig.appType !== 'micro') {
    api.modifyBabelPresetOpts(opts => {
      return {
        ...opts,
        import: (opts.import || []).concat([
          { libraryName: 'antd', libraryDirectory: 'es', style: true },
          { libraryName: 'antd-mobile', libraryDirectory: 'es', style: true },
        ]),
      };
    });
  }

  api.addDepInfo(() => {
    function getAntdDependency() {
      const { dependencies, devDependencies } = api.pkg;
      return (
        dependencies?.antd ||
        devDependencies?.antd ||
        require('../package').dependencies.antd
      );
    }

    return {
      name: 'antd',
      range: getAntdDependency(),
    };
  });

  const opts: IAntdOpts = api.userConfig.antd || {};

  if (opts?.dark || opts?.compact) {
    // support dark mode, user use antd 4 by default
    const { getThemeVariables } = require('antd/dist/theme');
    api.modifyDefaultConfig(config => {
      config.theme = {
        ...getThemeVariables(opts),
        ...config.theme,
      };
      return config;
    });
  }

  api.addProjectFirstLibraries(() => [
    {
      name: 'antd',
      path: dirname(require.resolve('antd/package.json')),
    },
    {
      name: 'antd-mobile',
      path: dirname(require.resolve('antd-mobile/package.json')),
    },
  ]);
  if (opts?.config) {
    api.onGenerateFiles({
      fn() {
        // runtime.tsx
        const runtimeTpl = readFileSync(
          join(__dirname, 'runtime.tpl'),
          'utf-8',
        );
        api.writeTmpFile({
          path: 'plugin-antd/runtime.tsx',
          content: Mustache.render(runtimeTpl, {
            config: JSON.stringify(opts?.config),
          }),
        });
      },
    });
    // Runtime Plugin
    api.addRuntimePlugin(() => [
      join(api.paths.absTmpPath!, 'plugin-antd/runtime.tsx'),
    ]);
    api.addRuntimePluginKey(() => ['antd']);
  }
};
