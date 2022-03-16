import { logger } from '@umijs/utils';
import { AlitaApi } from 'alita';
// import resetMainPath from './utils/resetMainPath/resetMainPath';

export default (api: AlitaApi) => {
  api.onStart(() => {
    logger.info('Using Main Path Plugin');
  });
  api.describe({
    key: 'mainPath',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
    enableBy: api.EnableBy.config,
  });

  if (api.userConfig.mainPath) {
    const mainPath = api.userConfig.mainPath.startsWith('/')
      ? api.userConfig.mainPath
      : `/${api.userConfig.mainPath}`;
    api.modifyRoutes((memo) => {
      Object.keys(memo).forEach((id) => {
        const route = memo[id];
        if (`/${route.path}` === mainPath && !route.isMainPath) {
          Object.keys(memo).forEach((key) => {
            const main = memo[key];
            if (
              main.path === '/' &&
              (main.id === 'index' || main.id === 'index/index')
            ) {
              // 将首页的文件和目标文件交换
              let file = memo[key].file;
              memo[key].file = memo[id].file;
              memo[id].file = file;
              memo[id].isMainPath = true;
              // 将原有的目标路由改成 /index
              memo[id].path = '/index';
            }
          });
        }
      });
      return memo;
    });
  }
};
