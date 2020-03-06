export default (keepalive: [], absTmpPath: string) => `
import { routes } from '${absTmpPath}/core/routes';
let BasicLayoutInstance = {
  keepAliveViewMap:{},
  alivePathnames: []
};
const getKeepAliveViewMap = (routeList:any[],aliveList:any[])=>{
  let keepAliveMap = {};
  function find(routess: any[], list:any[]) {
    if(!routess|| !list ){
      return routess;
    }
    return routess.map(element => {
      if (!Array.isArray(element.routes)&&list.includes(element.path)) {
        element.recreateTimes = 0;
        keepAliveMap[element.path] = element;
      }else{
        element.routes = find(element.routes,aliveList);
      }
      return element;
    });
  }
  find(routeList,aliveList)
  return keepAliveMap;
}

export function dropByCacheKey(pathname: string) {
  console.log('dropByCacheKey',pathname)
  if (BasicLayoutInstance) {
    const { alivePathnames, keepAliveViewMap } = BasicLayoutInstance;
    const index = alivePathnames.findIndex(item => item === pathname);
    if (index !== -1) {
      alivePathnames.splice(index, 1);
      // 用来当作key，只有key发生变化才会remout组件
      keepAliveViewMap[pathname].recreateTimes += 1;
    }
  }
}

BasicLayoutInstance.keepAliveViewMap = getKeepAliveViewMap(routes,${JSON.stringify(keepalive)});

const getBasicLayoutInstance = ()=>BasicLayoutInstance

const setBasicLayoutInstance = (value:any)=>{
  BasicLayoutInstance = value
}

export {
  getBasicLayoutInstance,setBasicLayoutInstance,
}
`;
