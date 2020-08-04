import { IApi, utils } from 'umi';
import { copyFileSync, writeFileSync, unlinkSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
// @ts-ingore
import AutoSkeletonPlugin from 'auto-skeleton-plugin';

const { chalk } = utils;

const exclude = ['alita', 'classnames'];
const include = ['antd-mobile', 'antd', 'rc-', 'rmc-'];

const getRotesPath = (routes: any[]) => {
  let routesPaths = [] as any;
  const getPath = (routes: any[]) => {
    routes.forEach(route => {
      if (route.path) {
        routesPaths.push(route.path)
      }
      if (route.routes) {
        getPath(route.routes)
      }
    });
  }
  getPath(routes)
  return [...new Set(routesPaths)]
}
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
  const outputPath = `dist/${packageId}/dist`;
  api.registerCommand({
    name: 'micro',
    fn: ({ args }) => {
      // 判断dist目录存在，说明已经执行过编译
      try {
        const state = statSync(outputPath);
        if (!state.isDirectory()) {
          console.error(
            `${chalk.red('Error:')} 请先执行 alita build 构建产物`,
          );
          return;
        }
      } catch (error) {
        console.error(
          `${chalk.red('Error:')} 请先执行 alita build 构建产物`,
        );
        return;
      }

      // 创建 asset-manifest.json
      // 后续需要可以开放配置，展示没有多余需求
      const content = JSON.stringify({
        name: displayName,
        version: new Date().getTime(),
        appKey: packageId,
        screen: {
          orientation: 'vertical', // 屏幕方向，横向 horizontal 和纵向 vertical，默认 vertical
          title: displayName, // 默认标题
          navbar: false,// 是否启用原生导航栏 true || false，默认 true
          type: 'web',// 页面的类型，考虑到不同的页面需要不同的逻辑，web || game，默认 web
          language: 'alita',// 开发语言 alita || normal，默认 alita
        }
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
      console.log(`${chalk.green('Copy: ')} ${displayIcon}`);
      const absTarget = join(api?.paths?.absOutputPath!, '..', 'icon.png');
      copyFileSync(displayIcon, absTarget);
      // 删除 dist 下的 vendors.js
      const vendors = join(api?.paths?.absOutputPath!, 'vendors.js');
      unlinkSync(vendors);
      console.log(`${chalk.green('Remove:')} ${vendors}`);

      // 修改 index.html
      const indexHtml = join(api?.paths?.absOutputPath!, 'index.html');
      let indexContent = readFileSync(indexHtml).toString();
      // console.log(indexContent);
      indexContent = indexContent.replace('<script src="./vendors.js"></script>', `<script src="http://www.alita-micro.com/vendors.js"></script>`);
      // <script src="./vendors.js"></script> <script src="http://www.alita-micro.com/vendors.js"></script>
      writeFileSync(indexHtml, indexContent, 'utf-8');
      console.log(`${chalk.green('Change:')} ${indexHtml}`);
    }
  })

  api.chainWebpack(async (config) => {
    const { exportStatic } = api.config;
    const dependencies = api.pkg.dependencies || {};
    const pkgNames = Object.keys(dependencies)
      .filter((i) => !exclude.includes(i))
      .concat(include);
    const rrr = await api.getRoutes()
    console.log();
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
    config
      .plugin('auto-skeleton-plugin')
      .use(AutoSkeletonPlugin, [{
        staticDir: api?.paths?.absOutputPath!,
        routes: exportStatic ? getRotesPath(rrr) : ['/'],
      }])
    return config;
  });

  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      outputPath,
      publicPath: './',
      chunks: ['vendors', 'micro', 'umi']
    };
  });
};
