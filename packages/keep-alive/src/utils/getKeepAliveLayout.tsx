export default (absTmpPath: string) => `
import React from 'react';
import { routes } from '${absTmpPath}/core/routes';
import { setLayoutInstance } from './KeepAliveModel';
const isKeepPath = (aliveList:any[],path:string)=>{
  let isKeep = false;
  aliveList.map(item=>{
    if(item === path){
      isKeep = true;
    }
    if(item instanceof RegExp && item.test(path)){
      isKeep = true;
    }
  })
  return isKeep;
}
const getKeepAliveViewMap = (routeList:any[],aliveList:any[])=>{
  let keepAliveMap = {};
  function find(routess: any[], list:any[]) {
    if(!routess|| !list ){
      return routess;
    }
    return routess.map(element => {
      if (!Array.isArray(element.routes)&&isKeepPath(list,element.path)) {
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
    setLayoutInstance(this);
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
    return (
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
  }
}

`;
