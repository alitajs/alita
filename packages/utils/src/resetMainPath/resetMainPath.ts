export default function resetMainPath(routes: any[], mainPath: string) {
  let newPath = mainPath;
  // 把用户输入/abc/ 转成 /abc
  if (newPath !== '/' && newPath.slice(-1) === '/') {
    newPath = newPath.slice(0, -1);
  }
  // 把用户输入abc 转成 /abc
  if (newPath !== '/' && newPath.slice(0, 1) !== '/') {
    newPath = `/${newPath}`;
  }
  return routes.map((element) => {
    if (element.isResetMainEdit) {
      return element;
    }
    if (element.path === '/' && !element.routes) {
      element.path = '/index';
      element.isResetMainEdit = true;
    }
    if (element.path === newPath) {
      element.path = '/';
      element.isResetMainEdit = true;
    }
    if (Array.isArray(element.routes)) {
      element.routes = resetMainPath(element.routes, mainPath);
    }
    return element;
  });
}
