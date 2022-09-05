import React, { useEffect } from 'react';
import { useOutlet, useLocation, matchPath, useNavigate } from 'react-router-dom'
{{^hasCustomTabs}}
{{#hasTabsLayout}}
import { Tabs, message } from 'antd';
{{/hasTabsLayout}}
{{/hasCustomTabs}}
{{#hasTabsLayout}}
import { useAppData } from '../exports';
{{/hasTabsLayout}}
{{#hasCustomTabs}}
import { getCustomTabs } from '@/app';
{{/hasCustomTabs}}

export const KeepAliveContext = React.createContext({});

{{^hasCustomTabs}}
{{#hasTabsLayout}}
const { TabPane } = Tabs;
{{/hasTabsLayout}}
{{/hasCustomTabs}}

const isKeepPath = (aliveList: any[], path: string) => {
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
    const getLocalFromRoutes = (routes) => {
        routes.forEach(item => {
            if(item.routes){
                getLocalFromRoutes(item.routes);
            }else{
                local[item.path] = item.name;
            }
        })
    }
    getLocalFromRoutes(data);
    return local;
}

export function useKeepOutlets() {
    const location = useLocation();
    const element = useOutlet();
{{#hasTabsLayout}}
    const navigate = useNavigate();
    const { clientRoutes } = useAppData();

    const localConfig = useMemo(() => {
        const runtime = getPluginManager().applyPlugins({ key: 'tabsLayout',type: 'modify', initialValue: {} });
        if(runtime?.local) return runtime.local;
        return getLocalFromClientRoutes(clientRoutes);
    }, []);
{{/hasTabsLayout}}
    const { cacheKeyMap, keepElements, keepalive, dropByCacheKey } = React.useContext<any>(KeepAliveContext);
    const isKeep = isKeepPath(keepalive, location.pathname);
    if (isKeep) {
        keepElements.current[location.pathname] = element;
    }
{{#hasCustomTabs}}
    const CustomTabs = getCustomTabs();
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
            <Tabs hideAdd onChange={(key: string) => {
                navigate(key);
            }} activeKey={location.pathname} type="editable-card" onEdit={(targetKey: string,) => {
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
                {Object.entries(keepElements.current).map(([pathname, element]: any) => {
                    // 拿这个pathname去local里面的key去匹配，匹配上的就是要显示的，如果都没有匹配上，才显示pathname
                    const tabName = getMatchPathName(pathname, localConfig);
                    return (
                        <TabPane tab={`${tabName}`} key={pathname}/>
                    );
                })}
            </Tabs>
        </div>
{{/hasTabsLayout}}
{{/hasCustomTabs}}
        {
            Object.entries(keepElements.current).map(([pathname, children]: any) => (
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
