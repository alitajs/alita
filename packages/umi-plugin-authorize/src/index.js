// ref:
// - https://umijs.org/plugin/develop.html
import assert from "assert";
function patchRoutes(routes, authorize) {
  routes.forEach(route => {
    if (route.routes) {
      patchRoutes(route.routes, authorize);
    } else {
      authorize.forEach(auth => {
        const { guard, include, exclude } = auth;
        //exclude和include可能是正则表达式或者字符串
        if (
          (!exclude ||
            (exclude instanceof RegExp && !exclude.test(route.path)) ||
            (route.path &&
              typeof exclude === "string" &&
              route.path.indexOf(exclude) === -1)) &&
          ((include &&
            (include instanceof RegExp && include.test(route.path))) ||
            (route.path &&
              typeof include === "string" &&
              route.path.indexOf(include) !== -1))
        ) {
          assert(
            Array.isArray(guard),
            `The guard must be Array, but got ${guard}`
          );
          route.Routes = guard;
        }
      });
    }
  });
}
export default function(api, opts={}) {
  api.modifyRoutes(routes => {
    if (opts.authorize) {
      assert(
        Array.isArray(opts.authorize),
        `The authorize must be Array, but got ${opts.authorize}`
      );
      patchRoutes(routes, opts.authorize);
    }
    return routes;
  });




}
