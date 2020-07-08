import { IApi, utils } from 'umi';

const exclude = ['alita','classnames'];
const include = ['antd-mobile', 'antd'];

export default (api: IApi) => {
  if (!api.userConfig.appType || api.userConfig.appType !== 'micro') {
    return;
  }

  api.chainWebpack((config, { webpack, env, createCSSRule }) => {
    const dependencies = api.pkg.dependencies || {};
    const pkgNames = Object.keys(dependencies).filter(i => !exclude.includes(i)).concat(include);
    config.merge({
      optimization: {
        usedExports: false,
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: '.',
          name: true,
          minSize: 30000,
          minChunks: 1,
          cacheGroups: {
            micro: {
              name: 'micro',
              chunks: 'all',
              enforce: true,
              test: (module: any, chunks: any) => {
                if (module.resource) {
                  for (let key = 0; key <= pkgNames.length; key++) {
                    if (module.resource.includes(`/node_modules/${pkgNames[key]}/`)) {
                      return true;
                    }
                  }
                }
                return false;
              },
              priority: -9
            },
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -12
            }
          }
        }
      }
    });
    return config;
  });
  api.modifyDefaultConfig(memo => {
    return {
      ...memo,
      chunks: ['vendors', 'micro', 'umi'],
    }
  });
};
