import { IApi, IRoute } from 'umi';
import assert from 'assert';
// {
//   guard: ["./routes/PrivateRoute.js"],
//   include: "scroll-to-top",
//   exclude: "scroll-to-top/a"
// }

interface AuthorizeItem {
  guard?: string[];
  include?: string | RegExp;
  exclude?: string | RegExp;
}
function patchRoutes(routes: IRoute[], authorize: AuthorizeItem[]) {
  routes.forEach(route => {
    if (route.routes) {
      patchRoutes(route.routes, authorize);
    } else {
      authorize.forEach(auth => {
        const { guard, include, exclude } = auth;
        //exclude和include可能是正则表达式或者字符串
        if (
          (!exclude ||
            (exclude instanceof RegExp && !exclude.test(route.path!)) ||
            (route.path && typeof exclude === 'string' && route.path.indexOf(exclude) === -1)) &&
          ((include && (include instanceof RegExp && include.test(route.path!))) ||
            (route.path && typeof include === 'string' && route.path.indexOf(include) !== -1))
        ) {
          assert(Array.isArray(guard), `The guard must be Array, but got ${guard}`);
          route.wrappers = guard;
        }
      });
    }
  });
}
export default function (api: IApi) {
  if (!api.userConfig.authorize) return;

  api.describe({
    key: 'authorize',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });
  api.modifyRoutes(routes => {
    if (api.userConfig.authorize) {
      assert(
        Array.isArray(api.userConfig.authorize),
        `The authorize must be Array, but got ${api.userConfig.authorize}`
      );
      patchRoutes(routes, api.userConfig.authorize);
    }
    return routes;
  });
}
