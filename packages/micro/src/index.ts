import { IApi, utils } from 'umi';
import { copyFileSync, writeFileSync, unlinkSync, readdirSync, rmdirSync, statSync, readFileSync, createWriteStream } from 'fs';
import { join } from 'path';
import archiver from 'archiver';
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
  api.addRuntimePlugin(() => join(__dirname, './runtime'));
  api.addEntryImports(() => {
    return [
      {
        source: 'alita-micro',
      }
    ]
  });
  // 开发的时候不需要下面的构建和骨架屏幕
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  const outputPath = `dist/${packageId}/dist`;
  const version = new Date().getTime();
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


  api.onBuildComplete(({ err }) => {
    if (err) {
      console.error(err)
      return;
    }
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
    const pkg = require(join(process.env.ALITA_DIR || '', 'package.json'));

    // 创建 asset-manifest.json
    // 后续需要可以开放配置，展示没有多余需求
    const content = JSON.stringify({
      name: displayName,
      version: version,
      appId: packageId,
      alitaVersion: pkg.version,
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
    // 不删除删除 vendors 引入
    // indexContent = indexContent.replace('<script src="./vendors.js"></script>', ``);
    writeFileSync(indexHtml, indexContent, 'utf-8');
    console.log(`${chalk.green('Change:')} ${indexHtml}`);

    // zip
    const archiveOutputPath = join(api?.paths?.absOutputPath!, '..', '..', `${packageId}-alitamicro-${version}.zip`);
    console.log(`${chalk.green('Create:')} ${packageId}-alitamicro-${version}.zip`);

    const output = createWriteStream(archiveOutputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
      console.log(archive.pointer() + ' total bytes');
      console.log('archiver has been finalized and the output file descriptor has closed.');
      console.log(`${chalk.green('Success:')} ${archiveOutputPath}`);
      function delDir(p: string) {
        // 读取文件夹中所有文件及文件夹
        var list = readdirSync(p)
        list.forEach((v, i) => {
          // 拼接路径
          var url = p + '/' + v
          // 读取文件信息
          var stats = statSync(url)
          // 判断是文件还是文件夹
          if (stats.isFile()) {
            // 当前为文件，则删除文件
            unlinkSync(url)
          } else {
            // 当前为文件夹，则递归调用自身
            delDir(url)
          }
        })
        // 删除空文件夹
        rmdirSync(p)
      }
      delDir(join(api?.paths?.absOutputPath!, '..'))
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function () {
      console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
      if (err.code === 'ENOENT') {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on('error', function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);
    archive.directory(join(outputPath, '..'), false);
    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();
  });
  api.registerCommand({
    name: 'micro',
    fn: ({ args }) => {

    }
  })
};
