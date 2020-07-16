import { IApi, utils } from 'umi';
import { copyFileSync, writeFileSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';

const { chalk } = utils;

const exclude = ['alita', 'classnames'];
const include = ['antd-mobile', 'antd', 'rc-', 'rmc-'];

export default (api: IApi) => {
  const { appType, packageId, displayName, displayIcon } = api.userConfig;
  if (!appType || appType !== 'micro') {
    return;
  }
  if (!packageId) {
    console.error(
      'config/config.ts 中 packageId 是必填项，请填写服务端提供的的appKey',
    );
    return;
  }

  if (!displayName) {
    console.error(
      'config/config.ts 中 displayName 是必填项，将作为项目中显示的微应用名称',
    );
    return;
  }

  if (!displayIcon) {
    console.error(
      'config/config.ts 中 displayIcon 是必填项，将作为项目中显示的微应用图标',
    );
    return;
  }

  if (!/.png$/.test(displayIcon)) {
    console.error(
      "config/config.ts 中 displayIcon 的值必须要正确的图片路径，可以尝试使用 path.join(process.cwd(), 'src/assets/logo.png')",
    );
    return;
  }

  try {
    const stat = statSync(displayIcon);
    if (!stat.isFile()) {
      console.error(
        "config/config.ts 中 displayIcon 的值必须要正确的图片路径，可以尝试使用 displayIcon:'src/assets/logo.png'",
      );
      return;
    }
  } catch (error) {
    console.error(
      "config/config.ts 中 displayIcon 的值必须要正确的图片路径，可以尝试使用 displayIcon:'src/assets/logo.png'",
    );
  }

  api.chainWebpack((config) => {
    const dependencies = api.pkg.dependencies || {};
    const pkgNames = Object.keys(dependencies)
      .filter((i) => !exclude.includes(i))
      .concat(include);
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
                    if (
                      module.resource.includes(`/node_modules/${pkgNames[key]}`)
                    ) {
                      return true;
                    }
                  }
                }
                return false;
              },
              priority: -9,
            },
            vendors: {
              name: 'vendors',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: -12,
            },
          },
        },
      },
    });
    return config;
  });

  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      outputPath: `dist/${packageId}/dist`,
      publicPath: './',
      chunks:
        process.env.NODE_ENV !== 'development'
          ? ['micro', 'umi']
          : ['vendors', 'micro', 'umi'],
    };
  });

  api.onBuildComplete(({ err }) => {
    if (!err) {
      // 创建 asset-manifest.json
      const content = JSON.stringify({
        name: displayName,
        version: new Date().getTime(),
        appKey: packageId,
      });
      const target = join(
        api?.paths?.absOutputPath!,
        '..',
        'asset-manifest.json',
      );
      // mkdirp.sync(dirname(target));
      console.log(`${chalk.green('Write:')} ${target}`);
      writeFileSync(target, content, 'utf-8');
      // 复制 icon
      console.log(displayIcon);
      console.log(`${chalk.green('Copy: ')} ${displayIcon}`);
      const absTarget = join(api?.paths?.absOutputPath!, '..', 'icon.png');
      copyFileSync(displayIcon, absTarget);
      // 删除 dist 下的 vendors.js
      const vendors = join(api?.paths?.absOutputPath!, 'vendors.js');
      unlinkSync(vendors);
      console.log(`${chalk.green('Remove:')} ${vendors}`);
    }
  });
};
