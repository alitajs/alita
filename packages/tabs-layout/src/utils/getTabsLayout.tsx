export default (absTmpPath: string) => `
import React, { FC, useState } from 'react';
import { Tabs } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { matchRoutes } from 'react-router-config';
import { history } from '../core/history';
import { getRoutes } from '${absTmpPath}/core/routes';
const isKeepPath = (aliveList:any[],path:string)=>{
  let isKeep = false;
  aliveList.map(item=>{
    if(item === path){
      isKeep = true;
    }
    if(item instanceof RegExp && item.test(path)){
      isKeep = true;
    }
    if(typeof item === 'string' && item.toLowerCase() === path){
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
      if (!Array.isArray(element.routes)&&isKeepPath(list,element.path?element.path.toLowerCase():'')) {
        element.recreateTimes = 0;
        keepAliveMap[element.path.toLowerCase()] = element;
      }else{
        element.routes = find(element.routes,aliveList);
      }
      return element;
    });
  }
  find(routeList,aliveList)
  return keepAliveMap;
}
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
const { TabPane } = Tabs;

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
      tPathname => tPathname === pathname.toLowerCase(),
    );
    if (index === -1) {
      if (delectKey !== pathname.toLowerCase()) {
        panels.push(pathname.toLowerCase());
        setPanels(panels);
      } else {
        setTimeout(() => setDelectKey(''), 1000);
      }
    }
    if(pathname.toLowerCase() !== activeKey){
      setActiveKey(pathname.toLowerCase());
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
    if (targetKey === pathname.toLowerCase()) {
      setDelectKey(targetKey);
      history.push(lastActiveKey);
    }
  };

  const getTabName = (curPathname) => {
    const trueMenu = [...menu];
    menu.forEach(abc => {
      if (abc.children) {
        abc.children.forEach(dddd => {
          trueMenu.push(dddd)
        })
      }
    });
    const list = trueMenu.filter(it => pathToRegexp(it[alias.path || 'path']).test(curPathname));
    if (list && list.length) {
      return list[0][alias.title || 'name'];
    }
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
          const currentView = getView(curPathname, keepAliveViewMap);
          const { component: View, recreateTimes } = currentView;
          const matchRoute = matchRoutes([currentView], curPathname)[0];
          const pageProps: any = { ...props,...matchRoute };
          const tabName = getTabName(curPathname);
          return View ? (
            <TabPane tab={tabName || View.title || curPathname} key={curPathname}>
              <View {...pageProps} />
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
