import type { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    console.log('Hello alita@3');
  });
  return {
    plugins: [
      require.resolve('./features/config/config'),
      require.resolve('./features/apptype'),
      require.resolve('./features/umiExports'),
      require.resolve('@alita/plugins/dist/aconsole'),
      require.resolve('@alita/plugins/dist/antdmobile'),
      require.resolve('@alita/plugins/dist/hd'),
      require.resolve('@alita/plugins/dist/keepalive'),
      require.resolve('@alita/plugins/dist/mainpath'),
      require.resolve('@alita/plugins/dist/request'),
      require.resolve('@alita/plugins/dist/mobile-layout'),
      require.resolve('@alita/plugins/dist/dva'),
      require.resolve('@alita/plugins/dist/classnames'),
      require.resolve('@alita/plugins/dist/model'),
      require.resolve('@alita/native'),
    ],
  };
};
