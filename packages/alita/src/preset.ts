import type { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    console.log('Hello alita@3');
  });
  const plugins = [
    require.resolve('./features/config/alitaconfig'),
    require.resolve('./features/apptype'),
    require.resolve('./commands/generate/pages'),
    require.resolve('@alita/plugins/dist/aconsole'),
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/mainpath'),
    require.resolve('@alita/plugins/dist/request'),
    require.resolve('@alita/plugins/dist/dva'),
    require.resolve('@alita/plugins/dist/classnames'),
    require.resolve('@alita/plugins/dist/model'),
  ];
  if (api.userConfig.antd) {
    plugins.push(require.resolve('@alita/plugins/dist/antd'));
  }
  if (api.userConfig.appType === 'native') {
    plugins.push(require.resolve('@alita/native'));
  }
  if (api.userConfig.appType !== 'pc') {
    plugins.push(require.resolve('@alita/plugins/dist/hd'));
    plugins.push(require.resolve('@alita/plugins/dist/antdmobile'));
    plugins.push(require.resolve('@alita/plugins/dist/mobile-layout'));
  }
  return {
    plugins,
  };
};
