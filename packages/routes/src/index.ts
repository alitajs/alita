import { IApi } from 'umi';
import assert from 'assert';
import exclude from './exclude';

function optsToArray(item: any) {
  if (!item) return [];
  if (Array.isArray(item)) {
    return item;
  } else {
    return [item];
  }
}

interface IOpts {
  exclude: string[] | string;
  update: Function;
}

export default function (api: IApi) {
  // disable if routes if configured
  if (api.userConfig.routes) return;

  api.describe({
    key: 'routesExtend',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.modifyRoutes((routes) => {
    const { routesExtend } = api.config;
    if (!routesExtend) return routes;
    routes = exclude(routes, optsToArray(routesExtend.exclude));

    if (routesExtend.update) {
      assert(
        typeof routesExtend.update === 'function',
        `opts.update should be function, but got ${routesExtend.update}`,
      );
      routes = routesExtend.update(routes);
    }

    return routes;
  });
}
