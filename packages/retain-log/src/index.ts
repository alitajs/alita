import { IApi, utils } from 'umi';

export default (api: IApi) => {
  const { NODE_ENV } = process.env;
  api.describe({
    key: 'retainLog',
    config: {
      schema(joi) {
        return joi.boolean();
      },
      default: false,
    },
  });

  const vConsole = api.userConfig?.aconsole && api.userConfig?.aconsole?.console;
  if (NODE_ENV === 'production' && !api.userConfig.retainLog && !vConsole) {
    api.addHTMLScripts(() => [
      {
        content: `window.console.log = ()=>{};
        window.console.info = ()=>{};
        window.console.warn = ()=>{};
        window.console.error = ()=>{};`,
      },
    ]);
  }
};
