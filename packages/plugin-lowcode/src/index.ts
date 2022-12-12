import type { AlitaApi } from '@alita/types';
import { logger } from '@umijs/utils';
import crypto from 'crypto';

export default (api: AlitaApi) => {
  // only build running
  if (!['build'].includes(api.name)) return;

  api.onStart(() => {
    logger.info('Using NoCode Plugin');
  });
  api.modifyConfig({
    stage: Number.MAX_SAFE_INTEGER,
    fn: (memo) => {
      memo.codeSplitting = false;
      return memo;
    },
  });
  api.chainWebpack((memo) => {
    const FRAMEWORK_BUNDLES = [
      'react-dom',
      'react',
      // 'core-js',
      // 'regenerator-runtime',
      'history',
      'react-router',
      'react-router-dom',
      'scheduler',
    ];

    const LINGXI_BUNDLES = ['@lingxiteam', 'echarts', '@babel'];
    const WUFENG_BUNDLES = ['@alita/s2', '@alita/s2-react', '@wufengteam'];

    const ANTD_BUNDLES = [
      'antd',
      'antd-mobile',
      'antd-mobile-icons',
      '@antv',
      '@ant-design',
    ];
    memo.module
      .rule('extra-src')
      .exclude.add(
        new RegExp(
          `[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.concat(
            LINGXI_BUNDLES,
            WUFENG_BUNDLES,
            ANTD_BUNDLES,
            ['lodash', 'lottie-web', 'mapbox-gl', '@bundled-es-modules'],
          ).join(`|`)})[\\\\/]`,
        ),
      )
      .end();
    memo.optimization.splitChunks({
      cacheGroups: {
        default: false,
        defaultVendors: false,
        framework: {
          name: 'framework',
          chunks: 'all',
          test: new RegExp(
            `[\\\\/]node_modules[\\\\/](${FRAMEWORK_BUNDLES.join(`|`)})[\\\\/]`,
          ),
          priority: 40,
          enforce: true,
        },
        lingxi: {
          name: 'lingxi',
          chunks: 'all',
          test: new RegExp(
            `[\\\\/]node_modules[\\\\/](${LINGXI_BUNDLES.join(`|`)})[\\\\/]`,
          ),
          priority: 40,
          enforce: true,
        },
        antd: {
          name: 'antd',
          chunks: 'all',
          test: new RegExp(
            `[\\\\/]node_modules[\\\\/](${ANTD_BUNDLES.join(`|`)})[\\\\/]`,
          ),
          priority: 40,
          enforce: true,
        },
        wufeng: {
          name: 'wufeng',
          chunks: 'all',
          test: new RegExp(
            `[\\\\/]node_modules[\\\\/](${WUFENG_BUNDLES.join(`|`)})[\\\\/]`,
          ),
          priority: 40,
          enforce: true,
        },
        lib: {
          test(module: any) {
            return (
              !isModuleCSS(module) &&
              module.size() > 160000 &&
              /node_modules[/\\]/.test(module.identifier())
            );
          },
          name(module: any) {
            const rawRequest =
              module.rawRequest &&
              module.rawRequest.replace(/^@(\w+)[/\\]/, '$1-');
            if (rawRequest) {
              return `${
                // when `require()` a package with relative path,
                // need remove leading `.` and `/`, otherwise will not found `.js` file
                // e.g. require('../../lib/codemirror')
                rawRequest.replace(/\./g, '_').replace(/\//g, '-')
              }-lib`;
            }

            const identifier = module.identifier();
            const trimmedIdentifier = /(?:^|[/\\])node_modules[/\\](.*)/.exec(
              identifier,
            );
            const processedIdentifier =
              trimmedIdentifier &&
              trimmedIdentifier[1].replace(/^@(\w+)[/\\]/, '$1-');

            return `${processedIdentifier || identifier}-lib`;
          },
          priority: 30,
          minChunks: 1,
          reuseExistingChunk: true,
          chunks: 'async',
        },
        shared: {
          name(_module: any, chunks: any) {
            const cryptoName = crypto
              .createHash('sha1')
              .update(
                chunks.reduce((acc: any, chunk: any) => {
                  return acc + chunk.name;
                }, ''),
              )
              .digest('base64')
              // replace `+=/` that may be escaped in the url
              // https://github.com/umijs/umi/issues/9845
              .replace(/\//g, '')
              .replace(/\+/g, '-')
              .replace(/=/g, '_');
            return `shared-${cryptoName}`;
          },
          priority: 10,
          minChunks: 2,
          reuseExistingChunk: true,
          chunks: 'async',
        },
      },
    });
    return memo;
  });
  // api.onBuildComplete(({ stats}) => {
  //   console.log(stats);
  // });
};
function isModuleCSS(module: { type: string }) {
  return (
    // mini-css-extract-plugin
    module.type === `css/mini-extract` ||
    // extract-css-chunks-webpack-plugin (old)
    module.type === `css/extract-chunks` ||
    // extract-css-chunks-webpack-plugin (new)
    module.type === `css/extract-css-chunks`
  );
}
