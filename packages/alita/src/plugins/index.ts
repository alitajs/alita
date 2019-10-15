import resetMainPath from '../utils/resetMainPath';

const { NODE_ENV } = process.env;

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove console.* except console.error
        compress: {
          drop_console: true,
          pure_funcs: ['console.error'],
        },
      },
    }
    : {};
const defaultOptions = {
  history: 'hash',
  treeShaking: true,
  targets: {
    ie: 9,
  },
  // uglifyJSOptions,
  umi: {
    dynamicImport: {
      webpackChunkName: true,
      level: 3,
    },
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
};

export default function (api) {
  const { debug, findJS, paths } = api;
  const options = api.config;
  const { umi = {}, appType = "pc", retainLog = false, complexRoute = false } = options;

  let opts = {
    ...defaultOptions, ...options, umi: {
      ...defaultOptions.umi, ...umi, hd: appType !== 'pc'
    },
    uglifyJSOptions: retainLog ? {} : uglifyJSOptions,
    // block: {
    //   defaultGitUrl: appType !== 'pc' ? 'https://github.com/alitajs/h5blocks' : 'https://github.com/ant-design/pro-blocks',
    // },
  };
  if (complexRoute) {
    opts.umi.routes = {
      // 规定只有index文件会被识别成路由
      exclude: [
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//
      ]
    }
  }
  api.modifyDefaultConfig(memo => {
    return {
      // build目录默认为www
      ...memo,
      ...opts
    }
  });
  // import { request } from 'alita';
  api.addRuntimePluginKey('request');

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
        .add(/public/)
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

  const registerConfigArr = ['retainLog', 'appType', 'umi', 'tongjiCode', 'gaCode', 'mainPath', 'complexRoute', 'keepalive'];
  registerConfigArr.forEach(item => {
    api._registerConfig(() => {
      return () => {
        return {
          name: item,
          validate: noop,
          onChange(newConfig) {
            api.restart(`${item} change`);
          },
        };
      };
    });
  })

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

  if (opts.mainPath) {
    api.modifyRoutes((routes: any[]) => {
      return resetMainPath(routes, opts.mainPath);
    });
  }

  const plugins = {
  } as any;

  // add convention authority
  if (findJS(paths.absSrcPath, 'Authority')) {
    plugins.authority = () => require('./authorize').default;
    opts.authority = {
      authorize: [
        {
          guard: ['src/Authority'],
          include: /\//,
          exclude: /\/user/i,
        },
      ],
    }
  }

  if (opts.tongjiCode) {
    plugins.tongji = () => require('./tongji').default;
    opts.tongji = {
      code: opts.tongjiCode,
      judge: () => true // true or false
    }
  }

  if (opts.gaCode) {
    plugins.ga = () => require('./ga').default;
    opts.ga = {
      code: opts.gaCode,
      judge: () => true // true or false
    }
  }

  if (opts.keepalive) {
    plugins.keepalive = () => require('./keepalive').default;
    opts.keepalive = {
      keepalive: opts.keepalive,
    }
  }

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
