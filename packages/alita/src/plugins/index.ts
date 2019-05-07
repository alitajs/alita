import path from 'path';
const defaultOptions = {
  history: 'hash',
  treeShaking: true,
  umi: {
    dva: true, antd: true, routes: {
      // 规定只有index文件会被识别成路由
      exclude: [
        /(?<![\s\S]*index\$?\.(js|jsx|ts|tsx)?)$/,
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//
      ]
    },
  },
  menu: {
    build: path.resolve('.', './src/menus.json'),
  }
};

export default function (api) {
  const { debug } = api;
  const options = api.config;
  const { umi = {}, appType = "pc" } = options;

  const opts = {
    ...defaultOptions, ...options, umi: {
      ...defaultOptions.umi, ...umi, hd: appType !== 'pc'
    }
  };
  // import { request } from 'alita';
  api.addRuntimePluginKey('request');

  // api.addVersionInfo([`alita@${require('../../package.json').version}`]);

  if (!process.env.ALITA_ESLINT || process.env.ALITA_ESLINT !== 'none') {
    api.chainWebpackConfig(config => {
      const eslintOptions = {
        baseConfig: {
          extends: [require.resolve('eslint-config-alita')],
        },
        ignore: false,
        eslintPath: require.resolve('eslint'),
        useEslintrc: false,
      };

      config.module
        .rule('eslint-alita')
        .test(/\.(js|jsx)$/)
        .include.add(api.paths.cwd)
        .end()
        .exclude
        .add(/node_modules/)
        .end()
        .enforce('pre')
        .use('eslint-loader')
        .loader(require.resolve('eslint-loader'))
        .options(eslintOptions);
    });
  }

  function getId(id) {
    return `alita:${id}`;
  }

  function noop() {
    return true;
  }
  const reactPlugin = require('umi-plugin-react').default;

  reactPlugin(api, opts.umi);

  api._registerConfig(() => {
    return () => {
      return {
        name: 'appType',
        validate: noop,
        onChange(newConfig) {
          api.restart('appType changed');
        },
      };
    };
  });

  api._registerConfig(() => {
    return () => {
      return {
        name: 'umi',
        validate: noop,
        onChange(newConfig) {
          api.service.restart(`umi config changed`);
        },
      };
    };
  });

  if (opts.pagePath) {
    api._registerConfig(() => {
      return () => {
        return {
          name: 'pagePath',
          validate: noop,
          onChange(newConfig) {
            api.service.restart(`pagePath config changed`);
          },
        };
      };
    });
    process.env.PAGES_PATH = opts.pagePath;
  }

  const plugins = {
    menu: () => require('umi-plugin-menus').default,
    authority: () => require('./authorize').default,
  };
  // 一些只有功能没有配置的插件
  const comPlugins = {
    prettier: () => require('./prettier').default,
    whale: () => require('./whale').default,
    alitagenerate: () => require('./generate/index').default,
    alitaversion: () => require('./version').default,
  } as any;

  if (opts.appType === 'cordova') {
    comPlugins.cordova = () => require('./cordova').default
  }

  Object.keys(plugins).forEach(key => {
    api.registerPlugin({
      id: getId(key),
      apply: plugins[key](),
      opts: opts[key],
    });

    api._registerConfig(() => {
      return () => {
        return {
          name: key,
          validate: noop,
          onChange(newConfig) {
            api.service.restart(`${name} changed`);
          },
        };
      };
    });
  });
  Object.keys(comPlugins).forEach(key => {
    api.registerPlugin({
      id: getId(key),
      apply: comPlugins[key](),
      opts: opts[key],
    });
  });
}
