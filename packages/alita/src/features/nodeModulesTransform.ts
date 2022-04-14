import { AlitaApi } from '../types';

export default (api: AlitaApi) => {
  // nodeModulesTransform
  api.describe({
    key: 'nodeModulesTransform',
    config: {
      schema(Joi) {
        return Joi.object();
      },
    },
    enableBy: api.EnableBy.config,
  });
  api.chainWebpack((memo) => {
    const isProd = api.env === 'production';
    if (!isProd) return memo;
    memo.module
      .rule('js-in-node_modules')
      .test(/\.(js|mjs)$/)
      .include.add(/node_modules/)
      .end()
      .use('babel-loader')
      .loader(require.resolve('@umijs/bundler-webpack/compiled/babel-loader'))
      .options({
        // Tell babel to guess the type, instead assuming all files are modules
        // https://github.com/webpack/webpack/issues/4039#issuecomment-419284940
        sourceType: 'unambiguous',
        babelrc: false,
        cacheDirectory: false,
        targets: {
          ie: 8,
        },
        presets: [
          [
            require.resolve('@umijs/babel-preset-umi'),
            {
              presetEnv: {},
              presetReact: {},
              presetTypeScript: {},
              pluginTransformRuntime: {},
              pluginLockCoreJS: {},
              pluginDynamicImportNode: false,
            },
          ],
        ],
      });
    return memo;
  });
};
