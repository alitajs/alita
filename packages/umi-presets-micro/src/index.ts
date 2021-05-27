import { IApi } from '@umijs/types';

export default function (api: IApi) {
  if (!api.hasPresets(['@alitajs/umi-presets-alita'])) {
    console.error('这个 presets 不能单独使用，请在 alita 项目中添加使用。');
    process.exit(0);
  }
  // 基本的插件在 @alitajs/umi-presets-alita
  let plugins = [

  ];

  if (api.userConfig.appType === 'micro') {
    plugins.push(require.resolve('@alitajs/micro'));
  }
  if (api.userConfig.appType === 'native' || api.userConfig.appType === 'micro') {
    plugins.push(require.resolve('@alitajs/native'));
  }

  return {
    plugins,
  };
}
