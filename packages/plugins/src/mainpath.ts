import { logger } from '@umijs/utils';
import { AlitaApi } from 'alita';
// import resetMainPath from './utils/resetMainPath/resetMainPath';

export default (api: AlitaApi) => {
  logger.info('Using Main Path Plugin');

  api.describe({
    key: 'mainPath',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
  });

  if (api.userConfig.mainPath) {
    // TODO: api.modifyRoutes
    // api.modifyRoutes((routes: any[]) => {
    //   return resetMainPath(routes, api.config.mainPath);
    // });
  }
};
