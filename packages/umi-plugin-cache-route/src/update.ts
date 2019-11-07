export default function (routes, keepalive: string[]) {
  function update(routes) {
    return routes.map(route => {
      if (dismantling(keepalive).indexOf(route.path) !== -1) {
        route.keepAlive = true;
        if (route.path.indexOf(':') !== -1) {
          route.multiple = true;
        }
      }
      if (route.routes) {
        route.routes = update(route.routes);
      }

      return route;
    });
  }

  return update(routes);
}

const dismantling = data => {
  const newData = [];
  data.map(item => {
    let pathStr = '';
    item.split('/').map(str => {
      if (!str) return item;
      pathStr = `${pathStr}/${str}`;
      if (newData.indexOf(pathStr) === -1) newData.push(`${pathStr}`);
    });
    return item;
  });
  return newData;
};
