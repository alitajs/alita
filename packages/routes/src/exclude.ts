import assert from 'assert';
import { IRoute } from 'umi';
type IExclude = Function | RegExp;

export default function(routes: IRoute[], excludes: IExclude[]) {
  function exclude(routes: IRoute[]) {
    return routes.filter((route: IRoute) => {
      for (const exclude of excludes) {
        assert(
          typeof exclude === 'function' || exclude instanceof RegExp,
          `exclude should be function or RegExp`,
        );

        if (typeof exclude === 'function' && exclude(route)) {
          return false;
        }
        if (
          route.component &&
          !route.component.startsWith('() =>') &&
          exclude instanceof RegExp &&
          exclude.test(route.component)
        ) {
          return false;
        }
      }
      if (route.routes) {
        route.routes = exclude(route.routes);
      }
      return true;
    });
  }

  return exclude(routes);
}
