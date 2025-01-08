import { IApi } from 'umi';
import { getSchemas } from './schema';

export default (api: IApi) => {
  // TODO: 以下的注释要根据后面的支持情况选择性开启
  const configDefaults: Record<string, any> = {
    history: { type: 'hash' },
    // title: false, // 默认内置了 Helmet
    // targets: {
    //   ie: 9,
    // },
    hash: true,
    // esbuild: {},
    // 不需要路由按需加载，只需要支持 import() 语法的 code splitting
    // dynamicImportSyntax: {}, umi@4 删除
    // nodeModulesTransform: { umi@4 删除
    //   type: 'none',
    //   exclude: [],
    // },
    // 这里不能控制 hd ，因为 hd 插件中，也包含了 modifyDefaultConfig 方法，umi 规则 modifyDefaultConfig 和 modifyConfig 只能通过 userConfig 控制
    hd: api.userConfig.appType !== 'pc' ? {} : false,
    dva: {
      enableModelsReExport: true,
    },
    // 兼容 alita2
    reactRouter5Compat: {},
    historyWithQuery: {},
    model: {},
    request: {},
    displayName: 'alita-demo',
    conventionRoutes: {
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
    moment2dayjs: {
      preset: 'antd',
      plugins: ['duration'],
    },
    mfsu: false,
    codeSplitting: {
      jsStrategy: 'granularChunks',
    },
    ...api.userConfig,
  };
  if (api.userConfig.complexRoute) {
    configDefaults.conventionRoutes = {
      // 保留umi的路由，过滤了非page的文件
      exclude: [
        /model\.(j|t)sx?$/,
        /\.test\.(j|t)sx?$/,
        /service\.(j|t)sx?$/,
        /models\//,
        /components\//,
        /services\//,
      ],
    };
  }
  api.modifyAppData((memo) => {
    memo.umi.name = 'Alita';
    memo.umi.importSource = 'alita';
    memo.umi.cliName = 'alita';
    return memo;
  });
  api.modifyConfig((memo: any) => {
    memo.alias.alita = 'umi';
    Object.keys(configDefaults).forEach((key) => {
      if (key === 'alias') {
        memo[key] = { ...memo[key], ...configDefaults[key] };
      } else {
        memo[key] = configDefaults[key];
      }
    });
    // umi4 开发环境不允许配置为 './'
    if (process.env.NODE_ENV === 'development' && memo.publicPath === './') {
      memo.publicPath = '/';
    }
    return memo;
  });

  const extraSchemas = getSchemas();

  for (const key of Object.keys(extraSchemas)) {
    const config: Record<string, any> = {
      schema: extraSchemas[key] || ((joi: any) => joi.any()),
    };
    if (key in configDefaults) {
      config.default = configDefaults[key];
    }
    api.registerPlugins([
      {
        id: `alita: config-${key}`,
        key: key,
        config,
      },
    ]);
  }

  // auto open url
  api.onDevCompileDone(async ({ isFirstCompile, ws }) => {
    const timer = setTimeout(async () => {
      if (isFirstCompile) {
        const open = require('open');
        await open(`http://localhost:${process.env.PORT}`);
      }
    }, 2000);
    ws?.wss.on('connection', async () => {
      clearTimeout(timer);
    });
  });
};
