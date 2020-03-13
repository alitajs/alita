export default (absTmpPath: string) => `
import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import { history } from '../core/history';
import { routes } from '${absTmpPath}/core/routes';

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
      if (!Array.isArray(element.routes) && isKeepPath(list, element.path.toLowerCase())) {
        element.recreateTimes = 0;
        keepAliveMap[element.path.toLowerCase()] = element;
      } else {
        element.routes = find(element.routes, aliveList);
      }
      return element;
    });
  }
  find(routeList, aliveList)
  return keepAliveMap;
}
const { TabPane } = Tabs;

interface PageProps {
  location: {
    pathname: string;
  };
  keepalive: [];
}

const BasicLayout: FC<PageProps> = (props) => {
  const { location: { pathname }, children } = props;
  const [activeKey, setActiveKey] = useState('');
  const [delectKey, setDelectKey] = useState('');
  const [panels, setPanels] = useState([]);
  const [keepAliveViewMap, setKeepAliveViewMap] = useState(getKeepAliveViewMap(routes, props.keepalive));
  const showKeepAlive = !!keepAliveViewMap[pathname];
  if (showKeepAlive) {
    const index = panels.findIndex(
      tPathname => tPathname === pathname,
    );
    if (index === -1) {
      if (delectKey !== pathname) {
        panels.push(pathname);
        setPanels(panels);
      } else {
        setTimeout(() => setDelectKey(''), 1000);
      }
    }
    if(pathname !== activeKey){
      setActiveKey(pathname);
    }
  }
  const onEdit = (targetKey, action) => {
    let lastIndex;
    let lastActiveKey;
    panels.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = panels.filter(pane => pane !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        lastActiveKey = panes[lastIndex];
      } else {
        lastActiveKey = panes[0]
      }
    }
    setPanels(panes);
    setActiveKey(lastActiveKey);
    if (targetKey === pathname) {
      setDelectKey(targetKey);
      history.push(lastActiveKey);
    }
  };
  return (
    <>
      <div hidden={!showKeepAlive} className="rumtime-tabs-layout" >
        <Tabs
          onChange={(targetKey)=>{
            history.push(targetKey)
          }}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          hideAdd
        >
          {panels.map(curPathname => {
            const View = keepAliveViewMap[curPathname].component;
            return View ? (
              <TabPane tab={keepAliveViewMap[curPathname].title || curPathname} key={curPathname}>
                <View {...props} />
              </TabPane>
            ) : { children };
          })}
        </Tabs>
      </div>
      {!showKeepAlive && children}
    </>)
}
export default BasicLayout;
`;
