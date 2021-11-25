import { dirname, join } from 'path';
import { IApi } from '@umijs/types';
import { winPath } from '@umijs/utils';
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
  // api.chainWebpack((memo) => {
  //   if (!!api.config.mobile5) {
  //     console.log(winPath(join(dirname(require.resolve('antd-mobile5/package')), '2x')))
  //     memo.resolve.alias.set(
  //       'antd-mobile5',
  //       winPath(join(dirname(require.resolve('antd-mobile5/package')), '2x')),
  //     );
  //   }
  //   return memo;
  // });
  //"dependencies": {
  // "antd-mobile5": "npm:antd-mobile-hd@next"
  // }
};
