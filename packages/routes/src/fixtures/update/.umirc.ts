
import { IRoute } from 'umi';

export default {
  routesExtend: {
    update(routes: IRoute[]) {
      return routes.filter((route: IRoute) => {
        if (/model\.(j|t)sx?$/.test(route.component)) {
          return false;
        }
        return true;
      });
    }
  }
}
