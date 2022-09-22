// copy from umi/packages/preset-umi/src/features/legacy/legacy.ts
// 因此当前版本不支持隐藏 legacy 配置，且默认 only build
import { chalk, lodash, logger } from '@umijs/utils';
import { IApi } from 'umi';

type WebpackChainFunc = Parameters<IApi['chainWebpack']>[0];
type WebpackChainConfig = Parameters<WebpackChainFunc>[0];

export default (api: IApi) => {
  api.describe({
    key: 'legacyBuild',
    config: {
      schema(Joi) {
        return Joi.boolean();
      },
    },
  });

  api.modifyConfig({
    stage: Number.MAX_SAFE_INTEGER,
    fn: (memo) => {
      const { userConfig, config } = api;

      const { legacyBuild } = config;
      if (api.env === 'development' || legacyBuild === false) {
        return memo;
      }

      if (
        userConfig.srcTranspiler ||
        userConfig.jsMinifier ||
        userConfig.cssMinifier
      ) {
        logger.fatal(
          `Manual configuration of ${[
            'srcTranspiler',
            'jsMinifier',
            'cssMinifier',
          ]
            .map((i) => chalk.yellow(i))
            .join(', ')} is not supported when ${chalk.cyan(
            'legacy',
          )} build mode enabled.`,
        );
        throw new Error(
          'Manual configuration of legacy mode is not supported.',
        );
      }

      /**
       * 🟢 babel:    only babel supported transform to es5
       * 🟡 swc:      support es5, but existence of edge case
       * 🔴 esbuild:  not supported es5
       */
      memo.srcTranspiler = 'babel';

      /**
       * 🟢 terser:   keep ecma target, same behavior as old bundle cli
       * 🟡 uglifyJs: cannot compress some package, may throw error
       * 🟡 swc:      support es5, but existence of edge case, need additional install @swc/core dep
       * 🔴 esbuild:  not supported es5
       */
      memo.jsMinifier = 'terser';

      /**
       * 🟢 cssnano:   same behavior as before
       * 🟢 parcelCSS: support low version targets, but need additional install package
       * 🔴 esbuild:   not supported low version browser as targets
       */
      memo.cssMinifier = 'cssnano';

      // specify a low-compatibility target for babel transform
      memo.targets = {
        ...userConfig.targets,
        ie: 11,
      };

      // transform all node_modules pkgs to es5
      memo.extraBabelIncludes = [
        ...(memo.extraBabelIncludes || []),
        /node_modules/,
      ];

      logger.ready(
        `${chalk.cyan(
          'legacy',
        )} mode is enabled, we automatically modify the ${[
          'srcTranspiler',
          'jsMinifier',
          'cssMinifier',
        ]
          .map((i) => chalk.yellow(i))
          .join(', ')} to be compatible with IE 11`,
      );

      const originChainWebpack = userConfig.chainWebpack;
      memo.chainWebpack = ((memo, ...args) => {
        if (originChainWebpack) {
          memo = originChainWebpack(memo, ...args);
        }

        // ensure svgr transform outputs is es5
        useBabelTransformSvgr(memo, api);

        // Top level sync import cannot be used with async externalType
        // https://github.com/webpack/webpack/issues/12465
        // https://github.com/webpack/webpack/issues/11874
        if (!lodash.isEmpty(userConfig.externals)) {
          const externalsAsString = JSON.stringify(userConfig.externals);
          const externalsType = memo.get('externalsType');
          // We should print warning: async externalsType should not be used
          if (
            // e.g.
            //  externals: {
            //    lodash: ['script http://path', '_']
            //  }
            externalsAsString.includes('script ') ||
            // e.g.
            // chainWebpack(memo) {
            //   memo.set('externalsType', 'script');
            //   return memo
            // }
            externalsType
          ) {
            logger.warn(
              `Legacy browsers do not support ${chalk.yellow(
                'Top level await',
              )}, ensure you are not using both ${chalk.bold.red(
                `Top level sync import`,
              )} and ${chalk.bold.red('Async externalsType (e.g. script)')}`,
            );
          }
        }

        return memo;
      }) as WebpackChainFunc;

      return memo;
    },
  });
};

function useBabelTransformSvgr(memo: WebpackChainConfig, api: IApi) {
  memo.module
    .rule('svgr')
    .use('babel-loader')
    .loader(require.resolve('@umijs/bundler-webpack/compiled/babel-loader'))
    .options({
      sourceType: 'unambiguous',
      babelrc: false,
      cacheDirectory: false,
      targets: api.config.targets,
      presets: [
        [
          require.resolve('@umijs/babel-preset-umi'),
          {
            presetEnv: {},
            presetReact: {},
            presetTypeScript: {},
          },
        ],
      ],
    })
    .before('svgr-loader')
    .end();
}
