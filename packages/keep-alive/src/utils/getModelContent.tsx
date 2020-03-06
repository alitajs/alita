export default (absTmpPath: string) => `
import React from 'react';
import { routes } from '${absTmpPath}/core/routes';
let BasicLayoutInstance: BasicLayout;
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

interface PageProps {
  location: {
    pathname: string;
  };
}
export default class BasicLayout extends React.PureComponent<PageProps> {
  constructor(props: any) {
    super(props);
    this.keepAliveViewMap = getKeepAliveViewMap(routes,props.keepalive);
  }
  componentDidMount() {
    BasicLayoutInstance = this;
  }

  keepAliveViewMap = {};

  alivePathnames: string[] = [];

  render() {
    const {
      location: { pathname },
    } = this.props;
    const showKeepAlive = !!this.keepAliveViewMap[pathname];
    if (showKeepAlive) {
      const index = this.alivePathnames.findIndex(
        tPathname => tPathname === pathname,
      );
      if (index === -1) {
        this.alivePathnames.push(pathname);
      }
    }
    const abc = (
      <>
        <div
          style={{ position: 'relative' }}
          hidden={!showKeepAlive}
        >
          {this.alivePathnames.map(curPathname => {
            const View = this.keepAliveViewMap[curPathname].component;
            return View ? (
              <div
                id={\`BasicLayout-\${curPathname}\`}
                key={
                  curPathname + this.keepAliveViewMap[curPathname].recreateTimes
                }
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                }}
                hidden={curPathname !== pathname}
              >
                <View {...this.props} />
              </div>
            ) : null;
          })}
        </div>
        <div hidden={showKeepAlive}>
          {!showKeepAlive && this.props.children}
        </div>
      </>
    )
    return abc;
  }
}

`;
