import resetMainPath from '../utils/resetMainPath';

const { NODE_ENV } = process.env;

const uglifyJSOptions =
  NODE_ENV === 'production'
    ? {
      uglifyOptions: {
        // remove comments
        output: {
          comments: false,
        },
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

  // export { match } from 'react-router-dom';
  // export { AnyAction, Reducer } from 'redux';
  api.addUmiExports([
    {
      specifiers: ['AnyAction', 'Reducer'],
      source: 'redux',
    },
    {
      specifiers: ['match'],
      source: 'react-router-dom',
    },
    {
      specifiers: ['EffectsCommandMap'],
      source: 'dva',
    },
  ]);
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
      // 保留 umi 的约定
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
  api.modifyAFWebpackOpts(memo => {
    return {
      ...memo,
      define: {
        ...memo.define,
        __IS_BROWSER: true,
      }
    }
  });

  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      ...opts
    }
  });
  // import { request } from 'alita';
  api.addRuntimePluginKey('request');

  function getId(id) {
    return `alita:${id}`;
  }

  function noop() {
    return true;
  }
  const reactPlugin = require('umi-plugin-react').default;

  reactPlugin(api, opts.umi);

  const registerConfigArr = ['retainLog', 'appType', 'umi', 'tongjiCode', 'gaCode', 'mainPath', 'complexRoute'];
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

  // 一些只有功能没有配置的插件
  const comPlugins = {
    alitagenerate: () => require('./generate/index').default,
    alitawhale: () => require('./whale').default,
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

    // eslint-disable-next-line no-underscore-dangle
    api._registerConfig(() => {
      return () => {
        return {
          name: key,
          validate: noop,
          onChange() {
            api.service.restart(`${key} changed`);
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
