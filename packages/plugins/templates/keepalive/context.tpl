import React, { useEffect } from 'react';
import { useOutlet, useLocation, matchPath, useNavigate } from 'react-router-dom'
{{^hasCustomTabs}}
{{#hasTabsLayout}}
import { Tabs, message, Dropdown, Button, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
{{/hasTabsLayout}}
{{/hasCustomTabs}}
{{#hasTabsLayout}}
import { getPluginManager } from '../core/plugin';
{{/hasTabsLayout}}
{{#hasCustomTabs}}
import { getCustomTabs } from '@/app';
{{/hasCustomTabs}}
{{#isPluginModelEnable}}
import { useModel } from '@@/plugin-model';
{{/isPluginModelEnable}}
import { useAppData } from '../exports';

{{^hasCustomTabs}}
{{#hasTabsLayout}}
const { TabPane } = Tabs;
{{/hasTabsLayout}}
{{/hasCustomTabs}}



export const KeepAliveContext = React.createContext({});
// 兼容非全路径的 path
const getFullPath = (currPath = '', parentPath = '') => {
  if (currPath.startsWith('/')) {
    return currPath;
  }
  return `${parentPath.replace(/\/$/, '')}/${currPath}`;
};
const findRouteByPath = (path, routes) => {
    let route = {};
    const find = (routess, parentPath) => {
        for(let i = 0; i < routess.length; i++){
            const item = routess[i];
            const fullPath = getFullPath(item.path, parentPath);
            if (matchPath(fullPath, path)&&!item.isLayout) {
                route = item;
                break;
            }
            if(item.children){
                find(item.children, fullPath);
            }
        }
    }
    find(routes);
    return route;
}
const isKeepPath = (aliveList: any[], path: string, route:any) => {
    let isKeep = false;
    aliveList.map(item => {
        if (item === path) {
            isKeep = true;
        }
        if (item instanceof RegExp && item.test(path)) {
            isKeep = true;
        }
        if (typeof item === 'string' && item.toLowerCase() === path) {
            isKeep = true;
        }
    })
    if(isKeep === false){
        isKeep = !!route.isKeepalive;
    }
    if(route?.redirect) {
        console.log('redirect')
        isKeep = false;
    }
    return isKeep;
}


const getMatchPathName = (pathname: string, local: Record<string, string>) => {
    const tabs = Object.entries(local);
    let tabName = pathname;

    for (const [key, value] of tabs) {
        if (matchPath(key, pathname)) {
            tabName = value;
            break;
        }
    }
    return tabName;
}

const getLocalFromClientRoutes = (data) => {
    const local = {};
    const getLocalFromRoutes = (routes, parentPath) => {
        routes.forEach(item => {
            const fullPath = getFullPath(item.path, parentPath);
            if(item.routes){
                getLocalFromRoutes(item.routes, fullPath);
            }else{
                local[fullPath] = item.name;
            }
        })
    }
    getLocalFromRoutes(data);
    return local;
}

export function useKeepOutlets() {
    const location = useLocation();
    const element = useOutlet();

{{#isPluginModelEnable}}
    const {initialState} = useModel('@@initialState');
{{/isPluginModelEnable}}

    const { clientRoutes, routes} = useAppData();
    const route = findRouteByPath(location.pathname,clientRoutes);
    const routeConfig = {...route,...(routes[route?.id]||{})};

{{#hasTabsLayout}}
    const navigate = useNavigate();
    {{#isPluginModelEnable}}
    const localConfig = React.useMemo(() => {
        const runtime = getPluginManager().applyPlugins({
          key: 'tabsLayout',
          type: 'modify',
          initialValue: {initialState},
        });
        if(runtime?.local) return runtime.local;
        return getLocalFromClientRoutes(clientRoutes);
    }, [initialState]);
    {{/isPluginModelEnable}}
    {{^isPluginModelEnable}}
      const localConfig = React.useMemo(() => {
        const runtime = getPluginManager().applyPlugins({
          key: 'tabsLayout',
          type: 'modify',
          initialValue: {},
        });
        if(runtime?.local) return runtime.local;
        return getLocalFromClientRoutes(clientRoutes);
      }, []);
    {{/isPluginModelEnable}}
{{/hasTabsLayout}}
    const {
      cacheKeyMap,
      keepElements,
      keepalive,
      dropByCacheKey,
      dropLeftTabs,
      dropRightTabs,
      dropOtherTabs,
      refreshCurrentTab,
    } = React.useContext<any>(KeepAliveContext);
    const isKeep = isKeepPath(keepalive, location.pathname, clientRoutes);
    if (isKeep && !keepElements.current[location.pathname]) {
      const currentIndex = Object.keys(keepElements.current).length;
      keepElements.current[location.pathname] = {
        children: element,
        index: currentIndex,
        name: getMatchPathName(location.pathname, localConfig),
      };
    }

    const selectAction = React.useCallback(({ key }) => {
      switch (key) {
        case "left":
          dropLeftTabs(location.pathname);
          break;

        case "right":
          dropRightTabs(location.pathname);
          break;

        case "others":
          dropOtherTabs(location.pathname);
          break;

        case "refresh":
          refreshCurrentTab(location.pathname);
          break;

        default:
          break;
      }
    },
    [location.pathname]
  );

    const TabsExtraContent = React.useMemo(() => {
      return (
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: "关闭左侧",
                  key: "left",
                },
                {
                  label: "关闭右侧",
                  key: "right",
                },
                {
                  label: "关闭其他",
                  key: "others",
                },
                {
                  type: "divider",
                },
                {
                  label: "刷新",
                  key: "refresh",
                },
              ]}
              onClick={selectAction}
            />
          }
          trigger={["click"]}
        >
          <Button size="small" icon={<EllipsisOutlined />} style={ { marginRight: 12 } } />
        </Dropdown>
      );
  }, [selectAction]);

{{#hasCustomTabs}}
    const CustomTabs = React.useMemo(()=>getCustomTabs(), []);
    const tabsProps = {
        isKeep, keepElements, navigate, dropByCacheKey, local: localConfig, activeKey: location.pathname
    }
{{/hasCustomTabs}}
    return <>
{{#hasCustomTabs}}
        <CustomTabs {...tabsProps}/>
{{/hasCustomTabs}}
{{^hasCustomTabs}}
{{#hasTabsLayout}}
        <div className="runtime-keep-alive-tabs-layout" hidden={!isKeep} >
            <Tabs
              tabBarExtraContent={TabsExtraContent}
              hideAdd
              onChange={(key: string) => {
                navigate(key);
              }}
              activeKey={location.pathname}
              type="editable-card"
              onEdit={(targetKey: string,) => {
                let newActiveKey = location.pathname;
                let lastIndex = -1;
                const newPanel = Object.keys(keepElements.current);
                for (let i = 0; i < newPanel.length; i++) {
                    if (newPanel[i] === targetKey) {
                        if(i===0 && newPanel.length>1){
                            lastIndex = newPanel.length-1
                        }else{
                            lastIndex = i - 1;
                        }
                    }
                }
                const newPanes = newPanel.filter(pane => pane !== targetKey);
                if (newPanes.length && newActiveKey === targetKey) {
                    if (lastIndex >= 0) {
                        newActiveKey = newPanel[lastIndex];
                    } else {
                        newActiveKey = newPanel[0];
                    }
                }
                if (lastIndex === -1 && targetKey === location.pathname) {
                    message.info('至少要保留一个窗口');
                } else {
                    dropByCacheKey(targetKey);
                    if (newActiveKey !== location.pathname) {
                        navigate(newActiveKey);
                    }
                }
            }}>
                {Object.entries(keepElements.current).map(([pathname, { name }]) => {
                    return <TabPane tab={name} key={pathname} />;
                })}
            </Tabs>
        </div>
{{/hasTabsLayout}}
{{/hasCustomTabs}}
        {
            Object.entries(keepElements.current).map(([pathname, { children }]: any) => (
                <div key={`${pathname}:${cacheKeyMap[pathname] || '_'}`} style={ { height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' } } className="runtime-keep-alive-layout" hidden={!matchPath(location.pathname, pathname)}>
                    {children}
                </div>
            ))
        }
        <div hidden={isKeep} style={ { height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' } } className="runtime-keep-alive-layout-no">
            {!isKeep && element}
        </div>
    </>
}
