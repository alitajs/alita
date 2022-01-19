import type { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    console.log('hello alita');
  });
  return {
    plugins: [
      require.resolve('./features/config/config'),
      require.resolve('./features/apptype'),
      require.resolve('@alita/plugins/dist/aconsole'),
      require.resolve('@alita/plugins/dist/antdmobile'),
      require.resolve('@alita/plugins/dist/hd'),
      require.resolve('@alita/plugins/dist/keepalive'),
      // require.resolve('@alita/plugins/dist/mainpath'),
      require.resolve('@alita/plugins/dist/request'),
      require.resolve('@alita/plugins/dist/mobile-layout'),
      require.resolve('@alita/plugins/dist/dva'),
      // require.resolve('@umijs/plugins/dist/model'),
      // mfsu no support
      // require.resolve('./features/umiExports'),
    ],
  };
};
