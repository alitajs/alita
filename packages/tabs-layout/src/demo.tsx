
import React from 'react';
import { routes } from '/Users/xiaohuoni/Desktop/nextAlitaApp/src/.umi/core/routes';
import { setLayoutInstance, dropByCacheKey } from './KeepAliveModel';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const isKeepPath = (aliveList: any[], path: string) => {
  let isKeep = false;
  aliveList.map(item => {
    if (item === path) {
      isKeep = true;
    }
    if (item instanceof RegExp && item.test(path)) {
      isKeep = true;
    }
  })
  return isKeep;
}
const getKeepAliveViewMap = (routeList: any[], aliveList: any[]) => {
  let keepAliveMap = {};
  function find(routess: any[], list: any[]) {
    if (!routess || !list) {
      return routess;
    }
    return routess.map(element => {
      if (!Array.isArray(element.routes) && isKeepPath(list, element.path)) {
        element.recreateTimes = 0;
        keepAliveMap[element.path] = element;
      } else {
        element.routes = find(element.routes, aliveList);
      }
      return element;
    });
  }
  find(routeList, aliveList)
  return keepAliveMap;
}

interface PageProps {
  location: {
    pathname: string;
  };
}
interface PageState{
  activeKey:string;
}
export default class BasicLayout extends React.PureComponent<PageProps,PageState> {
  constructor(props: any) {
    super(props);
    this.keepAliveViewMap = getKeepAliveViewMap(routes, props.keepalive);
    this.state = {
      activeKey: ''
    };
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
        this.setState({
          activeKey: pathname
        })
        this.alivePathnames.push(pathname);
      }
    }
    const tabsEdit = (targetKey, action) => {
      dropByCacheKey(targetKey)
      this.alivePathnames = this.alivePathnames.filter(path => path != targetKey)
    }
    return (
      <>
        <div
          style={{ position: 'relative' }}
          hidden={!showKeepAlive}
        >
          <Tabs
            onChange={(a)=>{
              this.setState({
                activeKey: a
              })
            }}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={tabsEdit}
            hideAdd
          >
            {this.alivePathnames.map(curPathname => {
              const View = this.keepAliveViewMap[curPathname].component;
              return View ? (
                <TabPane tab={this.keepAliveViewMap[curPathname].title} key={curPathname}>
                  <div
                    id={`BasicLayout-${curPathname}`}
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
                </TabPane>
              ) : null;
            })}
          </Tabs>
        </div>
        <div hidden={showKeepAlive}>
          {!showKeepAlive && this.props.children}
        </div>
      </>
    )
  }
}

