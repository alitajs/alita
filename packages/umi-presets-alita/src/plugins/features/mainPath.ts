import { IApi } from '@umijs/types';
import { resetMainPath } from '@alitajs/utils';

export default (api: IApi) => {
  api.describe({
    key: 'mainPath',
    config: {
      schema(joi) {
        return joi.string();
      },
    },
  });

  if (api.userConfig.mainPath) {
    api.modifyRoutes((routes: any[]) => {
      console.log(routes);
      console.log(resetMainPath(routes, api.config.mainPath));
      return routes;
    });
  }
};
