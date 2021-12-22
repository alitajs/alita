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
    // TODO: api.modifyRoutes
    // api.modifyRoutes((routes: any[]) => {
    //   return resetMainPath(routes, api.config.mainPath);
    // });
  }
};
