export default (absTmpPath: string) => `
import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { history } from '../core/history';
import { getRoutes } from '${absTmpPath}/core/routes';

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
      if (isKeepPath(list, element.path?element.path :'')) {
        element.recreateTimes = 0;
        keepAliveMap[element.path] = element;
      }
      if(Array.isArray(element.routes)){
        element.routes = find(element.routes, aliveList);
      }
      return element;
    });
  }
  find(routeList, aliveList)
  return keepAliveMap;
}

const getPageView = (keepAliveView, path='') => {
  let TrueView = false;
  const pathArr = path .split('/');
  const pathKey = [];
  for (let k = pathArr.length; k >= 0; k--) {
    pathKey.push(pathArr.join('/'));
    pathArr.length = k;
  }
  pathKey.forEach(key => {
    if (key !== path && keepAliveView[key] && keepAliveView[key].component) {
      TrueView = true;
    }
  });
  return TrueView ? null : keepAliveView[path].component;
}

const { TabPane } = Tabs;
const getView = (
  pathname: string,
  keepAliveViewMap: { [key: string]: any },
) => {
  let View;
  for (const key in keepAliveViewMap) {
    if (pathToRegexp(key).test(pathname)) {
      View = keepAliveViewMap[key]
      break;
    }
  }
  return View;
};
interface PageProps {
  location: {
    pathname: string;
  };
  keepalive: [];
  menu?: [],
  alias?: {
    path?: string;
    title?: string;
  }
}

const BasicLayout: FC<PageProps> = (props) => {
  const { location: { pathname }, children, menu = [], alias = { path: 'path', title: 'title'} } = props;
  const [activeKey, setActiveKey] = useState('');
  const [delectKey, setDelectKey] = useState('');
  const [panels, setPanels] = useState([]);
  const [keepAliveViewMap, setKeepAliveViewMap] = useState(getKeepAliveViewMap(getRoutes(), props.keepalive));
  const showKeepAlive = !!getView(pathname, keepAliveViewMap);
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

  const getTabName = (curPathname) => {
    const list = menu.filter(it => pathToRegexp(it[alias.path||'path']).test(curPathname));
    if(list && list.length) return list[0][alias.title||'title'];
    return '';
  }

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
          const View = getPageView(keepAliveViewMap, curPathname);
          const tabName = getTabName(curPathname);
          return View ? (
            <TabPane tab={tabName || View.title || curPathname} key={curPathname}>
              <View {...props} />
            </TabPane>
          ) : <TabPane tab={tabName || curPathname} key={curPathname}>
              {children}
            </TabPane>;
        })}
        </Tabs>
      </div>
      {!showKeepAlive && children}
    </>)
}
export default BasicLayout;
`;
