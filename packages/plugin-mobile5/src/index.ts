import { dirname, join } from 'path';
import { IApi } from '@umijs/types';
import BaseGenerator from './BaseGenerator/BaseGenerator';
import { existsSync } from 'fs';
export default (api: IApi) => {
  api.describe({
    key: 'mobile5',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  // 忽略用户安装，强制指定 mobile@5 版本
  api.chainWebpack((memo) => {
    if (!!api.config.mobile5) {
      memo.resolve.alias.set(
        'antd-mobile5',
        join(dirname(require.resolve('antd-mobile5/package.json')), '2x'),
      );
    }
    return memo;
  });

  api.onStart(async () => {
    if (!!api.config.mobile5) {
      if (
        !existsSync(
          `${api.paths.absNodeModulesPath}/@types/antd-mobile5/index.d.ts`,
        )
      ) {
        // logger.event('Create @types/antd-mobile5 Package');
        const generator = new BaseGenerator({
          path: join(__dirname, '..', 'templates', 'alias'),
          target: `${api.paths.absNodeModulesPath}/@types/antd-mobile5`,
          data: {
            antdMobilePath: join(
              dirname(require.resolve('antd-mobile5/package.json')),
            ),
            antdMobile: 'antd-mobile5',
          },
          questions: [],
        });
        await generator.run();
      }
    }
  });
};
