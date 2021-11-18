import { dirname, join } from 'path';
import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'antdMobile',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  // 忽略用户安装，强制指定 mobile@5 版本
  api.chainWebpack((memo) => {
    memo.resolve.alias.set(
      'antd-mobile',
      join(dirname(require.resolve('antd-mobile/package.json')), '2x'),
    );
    return memo;
  });
  // api.addProjectFirstLibraries(() => {
  //   const imps = [
  //     {
  //       name: 'antd-mobile',
  //       path: join(dirname(require.resolve('antd-mobile/package.json')), '2x'),
  //     },
  //   ];
  //   return imps;
  // });
};
