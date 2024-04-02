// tpl 语法非常乱，修改这个文件，请仔细仔细再仔细的验证之后再提交代码
import React, { ReactNode, useEffect } from 'react';
import { useOutlet, useLocation, matchPath, useNavigate } from 'react-router-dom'
{{^hasCustomTabs}}
{{#hasTabsLayout}}
import { Tabs, message, Dropdown, Button, Menu, TabPaneProps } from "antd";
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
{{^isNewTabsAPISupported}}
const { TabPane } = Tabs;
{{/isNewTabsAPISupported}}

export interface TabConfig extends TabPaneProps{
  icon?: ReactNode;
  name?: string;
  closable?: boolean;
}

{{/hasTabsLayout}}
{{/hasCustomTabs}}


export interface KeepAliveContextProps {
  keepalive: RegExp[],
  setKeepalive: React.Dispatch<React.SetStateAction<RegExp[]>>,
  keepElements: React.MutableRefObject<any>,
  dropByCacheKey: (path: string) => void,
  cacheKeyMap: Record<string, number>,
{{#hasTabsLayout}}
  tabNameMap: Record<string, number>,
  dropLeftTabs: (path: string) => void,
  dropRightTabs: (path: string) => void,
  dropOtherTabs: (path: string) => void,
  refreshTab: (path: string) => void,
  updateTab: (path: string, config: TabConfig) => void,
{{/hasTabsLayout}}
}

export const KeepAliveContext = React.createContext<KeepAliveContextProps>({});
type Subscription<T> = (val: T) => void;
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
            if (matchPath(fullPath?.toLowerCase(), path?.toLowerCase())&&!item.isLayout&& item.path !=='*') {
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
        if (typeof item === 'string' && item?.toLowerCase() === path?.toLowerCase()) {
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

{{#hasTabsLayout}}
const getMatchPathName = (pathname: string, local: Record<string, string>={}) => {
    const tabs = Object.entries(local);
    let tabName = pathname;

    for (const [key, value] of tabs) {
        // /* 404 page
        if (matchPath(key?.toLowerCase(), pathname?.toLowerCase()) && key !== '/*') {
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
            const fullPath = getFullPath(item.path?.toLowerCase(), parentPath?.toLowerCase());
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
{{/hasTabsLayout}}
// this error
let pathname = '';
export function useKeepOutlets() {
    const location = useLocation();
    pathname = location.pathname?.toLowerCase();
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
    const route = findRouteByPath(location.pathname?.toLowerCase(),clientRoutes);
    const routeConfig = {...route,...(routes[route?.id]||{})};

{{#hasTabsLayout}}
    const closeTab = (targetKey:string) => {
      const pathList = Object.keys(keepElements.current)
          if (pathList.length === 1) {
            message.info('至少要保留一个窗口')
            return
          }
          dropByCacheKey(targetKey?.toLowerCase())
          if (targetKey?.toLowerCase() === pathname?.toLowerCase()) {
            // 删除当前选中的tab时:
            // 1.如果当前tab是第一个时自动选中后一个
            // 2.不是第一个时自动选中前一个
            const i = pathList.indexOf(targetKey?.toLowerCase())
            const {pathname, hash, search } = keepElements.current[pathList[i === 0 ? i + 1 : i - 1]?.toLowerCase()].location;
            navigate(`${pathname}${search}${hash}`);
          }
    };
    const closeAllTabs = () => {
      const pathList = Object.keys(keepElements.current);
      pathList.forEach(targetKey => {
        dropByCacheKey(targetKey?.toLowerCase());
      });
    };
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
          initialValue: {initialState:{}},
        });
        if(runtime?.local) return runtime;
        return getLocalFromClientRoutes(clientRoutes,routes);
      }, []);
    {{/isPluginModelEnable}}

    const selectAction = React.useCallback(({ key }) => {
      switch (key) {
        case "left":
          dropLeftTabs(location.pathname?.toLowerCase());
          break;

        case "right":
          dropRightTabs(location.pathname?.toLowerCase());
          break;

        case "others":
          dropOtherTabs(location.pathname?.toLowerCase());
          break;

        case "refresh":
          refreshTab(location.pathname?.toLowerCase());
          break;

        default:
          break;
      }
    },
    [location.pathname]
  );
  const {icon:localConfigIcon ,local, initialState: _initialState, ...tabProps} = localConfig;
{{/hasTabsLayout}}

    const {
      cacheKeyMap,
      keepElements,
      keepalive,
      dropByCacheKey,
{{#hasTabsLayout}}
      tabNameMap,
      dropLeftTabs,
      dropRightTabs,
      dropOtherTabs,
      refreshTab,
      updateTab,
{{/hasTabsLayout}}
    } = React.useContext(KeepAliveContext);

    useEffect(()=>{
      keepaliveEmitter?.useSubscription?.((event) => {
        const { type = '', payload = {} } = event;
        switch(type){
          case 'dropByCacheKey':
            dropByCacheKey(payload?.path?.toLowerCase());
            break;
{{#hasTabsLayout}}
            case 'closeTab':
              closeTab(payload?.path?.toLowerCase());
              break;
            case 'closeAllTabs':
              closeAllTabs();
              break;
{{/hasTabsLayout}}
          default:
            break;
        }
      });
    },[])
    const isKeep = isKeepPath(keepalive, location.pathname?.toLowerCase(), routeConfig);
    if (isKeep && !keepElements.current[location.pathname?.toLowerCase()]) {
      const currentIndex = Object.keys(keepElements.current).length;
      {{#hasTabsLayout}}
      let icon = getMatchPathName(location.pathname, localConfigIcon);
      if(typeof icon === 'string') icon = '';

      const defaultName = getMatchPathName(location.pathname, local);
      // 国际化使用 pro 的约定
      const name = intl.formatMessage({ id: `menu${location.pathname.replaceAll('/', '.')}`, defaultMessage: defaultName });
      {{/hasTabsLayout}}
      keepElements.current[location.pathname?.toLowerCase()] = {
        children: element,
        index: currentIndex,
        {{#hasTabsLayout}}
        name,
        icon,
        closable: true, // 默认是true
        location,
        {{/hasTabsLayout}}
      };
    }
{{^hasCustomTabs}}
{{#hasTabsLayout}}

    const items = [
      {
        label: intl.formatMessage({
          id: `tabs.close.left`,
          defaultMessage: "关闭左侧",
        }),
        icon: <VerticalRightOutlined />,
        key: "left",
      },
      {
        label: intl.formatMessage({
          id: `tabs.close.right`,
          defaultMessage: "关闭右侧",
        }),
        icon: <VerticalLeftOutlined />,
        key: "right",
      },
      {
        label: intl.formatMessage({
          id: `tabs.close.others`,
          defaultMessage: "关闭其他",
        }),
        icon: <CloseOutlined />,
        key: "others",
      },
      {
        type: "divider",
      },
      {
        label: intl.formatMessage({
          id: `tabs.refresh`,
          defaultMessage: "刷新",
        }),
        icon: <ReloadOutlined />,
        key: "refresh",
      },
    ];
{{/hasTabsLayout}}
{{/hasCustomTabs}}
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
        updateTab,
        closeTab,
        local: localConfig.local,
        icons: localConfig.icon,
        activeKey: location.pathname,
        tabProps,
        tabNameMap
    }
{{/hasCustomTabs}}
    return <>
{{#hasCustomTabs}}
        <CustomTabs {...tabsProps}/>
{{/hasCustomTabs}}
{{^hasCustomTabs}}
{{#hasTabsLayout}}
        <div
          className="runtime-keep-alive-tabs-layout"
          hidden={!isKeep}
          {{#hasFixedHeader}}
          style={ {height:'40px',marginBottom:'12px'} }
          {{/hasFixedHeader}}
        >
            <Tabs
{{#hasDropdown}}
              tabBarExtraContent={
{{#hasFixedHeader}}
                <div style={ { position: 'fixed', right: 0,transform:'translateY(-50%)' } }>
{{/hasFixedHeader}}
                  <Dropdown
                    {{^isNewDropdownAPISupported}}
                    overlay={
                      <Menu
                        items={items}
                        onClick={selectAction}
                      />
                    }
                    {{/isNewDropdownAPISupported}}
                    {{#isNewDropdownAPISupported}}
                    menu={ {items, onClick: selectAction} }
                    {{/isNewDropdownAPISupported}}
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
                const path = key.split('::')[0];
                const { pathname, hash, search } = keepElements.current[path?.toLowerCase()].location;
                navigate(`${pathname}${search}${hash}`);
              }}
{{#hasFixedHeader}}
              renderTabBar={(props, DefaultTabBar) => (
                <div style={ {
                  position: 'fixed', zIndex: 1, padding: 0, width: '100%',
                  background: 'white'
                } }>
                  <DefaultTabBar {...props} style={ {
                    marginBottom: 0,
                  } } />
                </div>
              )}
{{/hasFixedHeader}}
              activeKey={`${location.pathname?.toLowerCase()}::${tabNameMap[location.pathname?.toLowerCase()]}`}
              type="editable-card"
              onEdit={(key: string) => {
                // 因为下方的 key 拼接了 tabNameMap[location.pathname]
                const targetKey = key.split('::')[0];
                closeTab(targetKey?.toLowerCase());
            }}
            {...tabProps}
            {{#isNewTabsAPISupported}}
            items={Object.entries(keepElements.current).map(([pathname, {name, icon, closable, children, ...other}]: any) => ({
              label: <>{icon}{name}</>,
              key: `${pathname?.toLowerCase()}::${tabNameMap[pathname?.toLowerCase()]}`,
              closable: Object.entries(keepElements.current).length === 1 ? false : closable,
              {{#hasFixedHeader}}
              style: { paddingTop: '20px' },
              {{/hasFixedHeader}}
              ...other
            }))}
            {{/isNewTabsAPISupported}}
            >
            {{^isNewTabsAPISupported}}
                {Object.entries(keepElements.current).map(([pathname, {name, icon, closable, children, ...other}]: any) => {
                    return (
                      <TabPane
                        {{#hasFixedHeader}}
                        style={ {
                          paddingTop:"20px"
                        } }
                        {{/hasFixedHeader}}
                        key={`${pathname?.toLowerCase()}::${tabNameMap[pathname?.toLowerCase()]}`}
                        tab={<>{icon}{name}</>}
                        closable={Object.entries(keepElements.current).length === 1?false:closable}
                        {...other}
                      />
                    );
                })}
                {{/isNewTabsAPISupported}}
            </Tabs>
        </div>
{{/hasTabsLayout}}
{{/hasCustomTabs}}
        {
            Object.entries(keepElements.current).map(([pathname, { children }]: any) => (
                <div
                  key={`${pathname?.toLowerCase()}:${cacheKeyMap[pathname?.toLowerCase()] || '_'}`}
                  className="runtime-keep-alive-layout"
                  style={ {
                    height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto',
                  } }
                  hidden={!matchPath(location.pathname?.toLowerCase(), pathname?.toLowerCase())}>
                    {children}
                </div>
            ))
        }
        <div hidden={isKeep} style={ { height: '100%', width: '100%', position: 'relative', overflow: 'hidden auto' } } className="runtime-keep-alive-layout-no">
            {!isKeep && element}
        </div>
    </>
}
