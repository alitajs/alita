// tpl 语法非常乱，修改这个文件，请仔细仔细再仔细的验证之后再提交代码
import React, { useEffect, ReactNode } from 'react';
import { useOutlet, useLocation, matchPath, useNavigate } from 'react-router-dom'
{{^hasCustomTabs}}
{{#hasTabsLayout}}
import { Tabs, message, Dropdown, Button, Menu } from "antd";
import { EllipsisOutlined, VerticalRightOutlined, VerticalLeftOutlined, CloseOutlined, ReloadOutlined } from "@ant-design/icons";
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
{{#hasIntl}}
import { useIntl } from '../exports';
{{/hasIntl}}
{{^hasCustomTabs}}
{{#hasTabsLayout}}
const { TabPane } = Tabs;
{{/hasTabsLayout}}
{{/hasCustomTabs}}

export interface TabConfig {
  icon?: ReactNode;
  name?: string;
  closable?: boolean;
}

export interface KeepAliveContextProps {
  keepalive: RegExp[],
  setKeepalive: React.Dispatch<React.SetStateAction<RegExp[]>>,
  keepElements: React.MutableRefObject<any>,
  dropByCacheKey: (path: string) => void,
  cacheKeyMap: Record<string, number>,
  tabNameMap: Record<string, number>,
  dropLeftTabs: (path: string) => void,
  dropRightTabs: (path: string) => void,
  dropOtherTabs: (path: string) => void,
  refreshTab: (path: string) => void,
  updateTab: (path: string, config: TabConfig) => void,
}

export const KeepAliveContext = React.createContext<KeepAliveContextProps>({});

class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    function subscription(val: T) {
      if (callback) {
        callback(val);
      }
    }
    this.subscriptions.add(subscription);
  };
}
export const keepaliveEmitter = new EventEmitter();

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
            // path:'*' 404 page
            if (matchPath(fullPath, path)&&!item.isLayout&& item.path !=='*') {
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


const getMatchPathName = (pathname: string, local: Record<string, string>={}) => {
    const tabs = Object.entries(local);
    let tabName = pathname;

    for (const [key, value] of tabs) {
        // /* 404 page
        if (matchPath(key, pathname) && key !== '/*') {
            tabName = value;
            break;
        }
    }
    return tabName;
}

const getLocalFromClientRoutes = (data,routesConfig) => {
    const config = {
        local: {},
        icon:{}
    };
    const getLocalFromRoutes = (routes, parentPath) => {
        routes.forEach(item => {
            const fullPath = getFullPath(item.path, parentPath);
            if(item.routes){
                getLocalFromRoutes(item.routes, fullPath);
            }else{
                const routeConfig = {...item,...(routesConfig[item?.id]||{})};
                config.local[fullPath] = routeConfig.name;
                config.icon[fullPath] = routeConfig.icon;
            }
        })
    }
    getLocalFromRoutes(data,'');
    return config;
}

export function useKeepOutlets() {
    const location = useLocation();
    const element = useOutlet();
{{#hasIntl}}
    const intl = useIntl();
{{/hasIntl}}
{{^hasIntl}}
    const intl = {
        formatMessage:({defaultMessage})=>defaultMessage
    };
{{/hasIntl}}
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
        if(runtime?.local) return runtime;
        return getLocalFromClientRoutes(clientRoutes,routes);
    }, [initialState]);
    {{/isPluginModelEnable}}
    {{^isPluginModelEnable}}
      const localConfig = React.useMemo(() => {
        const runtime = getPluginManager().applyPlugins({
          key: 'tabsLayout',
          type: 'modify',
          initialValue: {},
        });
        if(runtime?.local) return runtime;
        return getLocalFromClientRoutes(clientRoutes,routes);
      }, []);
    {{/isPluginModelEnable}}

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
          refreshTab(location.pathname);
          break;

        default:
          break;
      }
    },
    [location.pathname]
  );
{{/hasTabsLayout}}

    const {
      cacheKeyMap,
      tabNameMap,
      keepElements,
      keepalive,
      dropByCacheKey,
      dropLeftTabs,
      dropRightTabs,
      dropOtherTabs,
      refreshTab,
    } = React.useContext(KeepAliveContext);

  keepaliveEmitter?.useSubscription?.((event) => {
    const { type = '', payload = {} } = event;
    switch(type){
      case 'dropByCacheKey':
        dropByCacheKey(payload?.path);
        break;
      default:
        break;
    }
  });
    const isKeep = isKeepPath(keepalive, location.pathname, routeConfig);
    if (isKeep && !keepElements.current[location.pathname]) {
      const currentIndex = Object.keys(keepElements.current).length;
      {{#hasTabsLayout}}
      let icon = getMatchPathName(location.pathname, localConfig.icon);
      if(typeof icon === 'string') icon = '';

      const defaultName = getMatchPathName(location.pathname, localConfig.local);
      // 国际化使用 pro 的约定
      const name = intl.formatMessage({ id: `menu${location.pathname.replaceAll('/', '.')}`, defaultMessage: defaultName });
      {{/hasTabsLayout}}
      keepElements.current[location.pathname] = {
        children: element,
        index: currentIndex,
        {{#hasTabsLayout}}
        name,
        icon,
        closable: true, // 默认是true
        {{/hasTabsLayout}}
      };
    }

{{#hasCustomTabs}}
    const CustomTabs = React.useMemo(()=>getCustomTabs(), []);
    const tabsProps = {
        isKeep,
        keepElements,
        navigate,
        dropByCacheKey,
        dropLeftTabs,
        dropRightTabs,
        dropOtherTabs,
        refreshTab,
        local: localConfig.local,
        icons: localConfig.icon,
        activeKey: location.pathname
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
{{#hasDropdown}}
              tabBarExtraContent={
{{#hasFixedHeader}}
                <div style={{ position: 'fixed', right: 0,transform:'translateY(-50%)' }}>
{{/hasFixedHeader}}
                  <Dropdown
                    overlay={
                      <Menu
                        items={[
                          {
                            label: "关闭左侧",
                            icon: <VerticalRightOutlined />,
                            key: "left",
                          },
                          {
                            label: "关闭右侧",
                            icon: <VerticalLeftOutlined />,
                            key: "right",
                          },
                          {
                            label: "关闭其他",
                            icon: <CloseOutlined />,
                            key: "others",
                          },
                          {
                            type: "divider",
                          },
                          {
                            label: "刷新",
                            icon: <ReloadOutlined />,
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
{{#hasFixedHeader}}
                </div>
{{/hasFixedHeader}}
              }
{{/hasDropdown}}
              hideAdd
              onChange={(key: string) => {
                const path = key.split(':')[0];
                navigate(path);
              }}
{{#hasFixedHeader}}
              renderTabBar={(props, DefaultTabBar) => (
                <div style={{
                  position: 'fixed', zIndex: 1, padding: 0, width: '100%',
                  background: 'white'
                }}>
                  <DefaultTabBar {...props} style={{
                    marginBottom: 0,
                  }} />
                </div>
              )}
{{/hasFixedHeader}}
              activeKey={`${location.pathname}::${tabNameMap[location.pathname]}`}
              type="editable-card"
              onEdit={(key: string) => {
                // 因为下方的 key 拼接了 tabNameMap[location.pathname]
                const targetKey = key.split('::')[0];
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
                {Object.entries(keepElements.current).map(([pathname, {name, icon, closable}]: any) => {
                    return (
                      <TabPane
{{#hasFixedHeader}}
                        style={{
                          paddingTop:"20px"
                        }}
{{/hasFixedHeader}}
                        key={`${pathname}::${tabNameMap[pathname]}`}
                        tab={<>{icon}{name}</>}
                        closable={Object.entries(keepElements.current).length === 1?false:closable}
                      />
                    );

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
