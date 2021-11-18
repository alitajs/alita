import { IApi, IConfig } from '@umijs/types';

export default (api: IApi) => {
  // 这几个配置需要合并配置
  const { externals = {}, scripts = [], ssr, mobile5 } = api.userConfig;
  const defaultOptions = {
    history: { type: 'hash' },
    title: false, // 默认内置了 Helmet
    targets: {
      ie: 9,
    },
    hash: true,
    esbuild: {},
    // 不需要路由按需加载，只需要支持 import() 语法的 code splitting
    dynamicImportSyntax: {},
    nodeModulesTransform: {
      type: 'none',
      exclude: [],
    },
    dva: {},
    routesExtend: {
      // 规定只有index文件会被识别成路由
      exclude: [
        /(?<!(index|\[index\]|404)(\.(js|jsx|ts|tsx)))$/,
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
      ],
    },
    ...api.userConfig,
  } as IConfig;

  if (mobile5) {
    defaultOptions.antdMobile = true;
  } else {
    defaultOptions.antd = {
      ...(api.userConfig?.antd || {}),
    };
  }
  // ssr 路由必须是 browser
  if (ssr) {
    defaultOptions.history = { type: 'browser' };
    // fix: https://github.com/umijs/umi/pull/7256
    defaultOptions.hash = false;
  }

  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      ...defaultOptions,
    };
  });
};
