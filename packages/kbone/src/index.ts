import { IApi, utils } from 'umi';
import { join } from 'path';

export default (api: IApi) => {
  if (!api.userConfig.kbone) return;
  api.describe({
    key: 'kbone',
    config: {
      schema(joi) {
        return joi.boolean();
      },
    },
  });
  // process.env.NODE_ENV = 'production';
  api.chainWebpack((config, { webpack }) => {
    // Set alias
    console.log(config.mode);
    // Delete progress bar plugin
    return config;
  });
};
