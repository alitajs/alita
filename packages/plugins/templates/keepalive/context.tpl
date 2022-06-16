import React, { useState } from 'react';
import { useOutlet, useLocation, matchPath, useNavigate } from 'react-router-dom'
{{#hasTabsLayout}}
import { Tabs, message } from 'antd';
import { getPluginManager } from '../core/plugin';
{{/hasTabsLayout}}
export const KeepAliveContext = React.createContext({});

{{#hasTabsLayout}}
const { TabPane } = Tabs;
{{/hasTabsLayout}}

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

export function useKeepOutlets() {
    const location = useLocation();
    const element = useOutlet();
{{#hasTabsLayout}}
    const navigate = useNavigate();
    const runtime = getPluginManager().applyPlugins({ key: 'tabsLayout',type: 'modify', initialValue: {} });
    const { local } = runtime;
{{/hasTabsLayout}}
    const { cacheKeyMap, keepElements, keepalive, dropByCacheKey } = React.useContext<any>(KeepAliveContext);
    const isKeep = isKeepPath(keepalive, location.pathname);
    if (isKeep) {
        keepElements.current[location.pathname] = element;
    }
    return <>
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
                        lastIndex = i - 1;
                    }
                }
                const newPanes = newPanel.filter(pane => pane !== targetKey);
                if (newPanes.length && newActiveKey === targetKey) {
                    if (lastIndex >= 0) {
                        newActiveKey = newPanes[lastIndex];
                    } else {
                        newActiveKey = newPanes[0];
                    }
                }
                if (newActiveKey !== location.pathname) {
                    dropByCacheKey(targetKey);
                    navigate(newActiveKey);
                } else if (lastIndex === -1 && targetKey === location.pathname) {
                    message.info('至少要保留一个窗口');
                }
            }}>
                {Object.entries(keepElements.current).map(([pathname, element]: any) => (
                    <TabPane tab={`${local[pathname] || pathname}`} key={pathname}/>
                ))}
            </Tabs>
        </div>
{{/hasTabsLayout}}
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
