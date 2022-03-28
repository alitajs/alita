export default () => `
// @ts-nocheck

import pathToRegexp from '@umijs/deps/compiled/path-to-regexp';

interface LayoutInstanceProps {
  alivePathnames: string[],
  keepAliveViewMap: {}
}
let LayoutInstance: LayoutInstanceProps;
function dropByCacheKey(pathname: string) {
  if (LayoutInstance) {
    const { alivePathnames, keepAliveViewMap } = LayoutInstance;
    const index = alivePathnames.findIndex(item => item === pathname?.toLowerCase());
    if (index !== -1) {
      alivePathnames.splice(index, 1);
      // 用来当作key，只有key发生变化才会remout组件
      for (const key in keepAliveViewMap) {
        if (pathToRegexp(key).test(pathname?.toLowerCase())) {
          keepAliveViewMap[key].recreateTimes += 1;
          break;
        }
      }
    }
  }
}
function patchKeepAlive(fn: (config: any[]) => any[]) {
  if (LayoutInstance) {
    LayoutInstance.patchKeepAlive(fn);
  }
}
const setLayoutInstance = (value: any) => {
  LayoutInstance = value
}
const getLayoutInstance = () => LayoutInstance;

export {
  setLayoutInstance, getLayoutInstance, dropByCacheKey, patchKeepAlive
}
`;
