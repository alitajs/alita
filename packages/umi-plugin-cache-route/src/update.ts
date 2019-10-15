export default function(routes, keepalive: string[]) {
  function update(routes) {
    return routes.map(route => {
      if (keepalive.indexOf(route.path) !== -1) {
        route.keepAlive = true;
      }
      if (route.routes) {
        route.routes = update(route.routes);
      }
      return route;
    });
  }

  return update(routes);
}
