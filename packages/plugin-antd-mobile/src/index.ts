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

  api.addProjectFirstLibraries(() => {
    const imps = [
      {
        name: 'antd-mobile',
        path: join(dirname(require.resolve('antd-mobile/package.json')), '2x'),
      },
    ];
    return imps;
  });
};
