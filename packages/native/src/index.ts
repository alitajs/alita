import { utils } from 'umi';
import { statSync } from 'fs';
import { join } from 'path';
import { IApi, IConfig } from '@umijs/types';
import { copyDirectory } from './utils';

const { chalk } = utils;


export default (api: IApi) => {
  // 运行 dev 和 build 时，使用环境变量 NATIVE 来区分
  const nativeIsIos = !(process.env.NATIVE === 'android');
  const defaultOptions = {
    // build目录默认为www
    outputPath: `platforms/${nativeIsIos ? 'android' : 'ios'}/www`,
    history: { type: 'hash' },
    base: './',
    publicPath: './',
    metas: [
      {
        content: 'no',
        name: 'msapplication-tap-highlight',
      },
    ],
  } as IConfig;

  api.modifyDefaultConfig((memo) => {
    return {
      ...memo,
      ...defaultOptions,
    };
  });

  api.addEntryImports(() => {
    return [
      {
        source: 'alita-micro',
      }
    ]
  });

  // 添加平台的命令
  api.registerCommand({
    name: 'platforms',
    fn: ({ args }) => {
      const { appType, packageId, displayName, } = api.userConfig;
      if (!appType || appType !== 'native') {
        console.error(
          'platforms 命令，appType 必须为 native，请修改配置 appType',
        );
        return;
      }

      if (!packageId) {
        console.error(
          'config/config.ts 中 packageId 是必填项，请增加配置 packageId',
        );
        return;
      }

      if (!displayName) {
        console.error(
          'config/config.ts 中 displayName 是必填项，请增加配置 displayName',
        );
        return;
      }

      if (!args.android && !args.ios) {
        console.error(
          '请使用 alita platforms --ios 或者  alita platforms --android 来标示需要添加的平台',
        );
        return;
      }

      const isIos = !args.android;
      const targetPath = join(api.paths.cwd!, 'platform', 'ios');
      try {
        const state = statSync(targetPath);
        if (state.isDirectory()) {
          console.error(
            `${chalk.red('Error:')} platforms ios 已经添加无需再次执行，如果需要重制框架，请删除 platforms/ios 目录`,
          );
          return;
        }
      } catch (error) {
      }
      try {
        copyDirectory({
          path: isIos ? join(__dirname, '../templates/alita-ios') : '',
          target: targetPath,
          displayName,
          packageId,
          isIos
        })
        console.error(
          `${chalk.green('Success:')} platforms ios 添加成功，请在 platforms/ios 目录下手动执行 pod install后使用 xcode 打开 ios 项目`,
        );
        console.error(
          `${chalk.green('Success:')} cd platform/ios && pod install`,
        );
      } catch (error) {
        console.error(
          `${chalk.red('Error:')} platforms ios 添加失败，请删除 platforms/ios 目录后重试`,
        );
      }

    }
  })
};
