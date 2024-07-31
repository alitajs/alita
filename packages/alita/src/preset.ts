import { chalk, logger } from '@umijs/utils';
import type { IApi } from 'umi';
// @ts-ignore
import pkg from '../package.json';

export default (api: IApi) => {
  api.onStart(() => {
    logger.info(chalk.bold(chalk.cyan(`alita v${pkg?.version || '3'}`)));
  });
  const mobileType = ['h5', 'cordova', 'micro', 'native'];
  const corePlugins = [
    require.resolve('./features/config/alitaconfig'),
    require.resolve('./features/alitaloading'),
    require.resolve('./features/apptype'),
    require.resolve('./features/legacy'),
    require.resolve('./features/preloading'),
    // TODO: 需要和当前路由信息联动
    // require.resolve('./features/qrcodeterminal'),
    require.resolve('./commands/env'),
    require.resolve('./commands/generate/pages'),
    // aigc
    // require.resolve('@alita/plugin-azure'),
    require.resolve('./features/compatibleMako'),
  ];
  const plugins = [
    require.resolve('@alita/plugins/dist/aconsole'),
    require.resolve('@alita/plugins/dist/keepalive'),
    require.resolve('@alita/plugins/dist/tabs-layout'),
    require.resolve('@alita/plugins/dist/mainpath'),
    require.resolve('@alita/plugins/dist/request'),
    require.resolve('@alita/plugins/dist/dva'),
    require.resolve('@alita/plugins/dist/classnames'),
    require.resolve('@alita/plugins/dist/model'),
    // umi 内置了 helmet
    require.resolve('@alita/plugins/dist/moment'),
  ];
  if (api.userConfig.antd) {
    plugins.push(require.resolve('@alita/plugins/dist/antd'));
  }
  if (api.userConfig.appType === 'native') {
    plugins.push(require.resolve('@alita/native'));
  }
  if (api.userConfig.appType && mobileType.includes(api.userConfig.appType)) {
    plugins.push(require.resolve('@alita/plugins/dist/hd'));
    plugins.push(require.resolve('@alita/plugins/dist/antdmobile'));
    plugins.push(require.resolve('@alita/plugins/dist/mobile-layout'));
  }
  // docs 暂时不做任何操作，后续可加插件和组件
  if (api.userConfig.appType === 'docs') {
    return {
      plugins: [require.resolve('./features/apptype')],
    };
  }

  // 增加国际化需求
  if (api.userConfig.locale) {
    plugins.push(require.resolve('@alita/plugins/dist/max/locale'));
  }
  // 增加初始化数据
  if (api.userConfig.initialState) {
    // initial-state 需要在 model 之前加载
    plugins.unshift(require.resolve('@alita/plugins/dist/max/initial-state'));
  }

  // 记忆偏差修正，umi 中没有这个功能。
  // 执行 lint 时，只需要加载基础的插件
  // const onlyCorePlugin = ['lint'].includes(api.name);
  return {
    plugins: [...corePlugins, ...plugins],
  };
};
