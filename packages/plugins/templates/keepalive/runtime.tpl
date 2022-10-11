import React from 'react';
import { KeepAliveContext } from './context';
{{#hasGetKeepalive}}

import { getKeepAlive } from '@/app';
{{/hasGetKeepalive}}

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({});
  const [cacheKeyMap, setCacheKeyMap] = React.useState({});
  const [tabNameMap, setTabNameMap] = React.useState({});
  const [keepalive, setKeepalive] = React.useState([{{{ keepalive }}}]);
{{#hasGetKeepalive}}

  const init = async() => {
    try {
      const runtime = await getKeepAlive(keepalive);
      setKeepalive(runtime);
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(()=>{
    init();
  },[])
{{/hasGetKeepalive}}

  function dropByCacheKey(path: string) {
    if(keepElements.current[path]){
      delete keepElements.current[path];
      setCacheKeyMap(cacheKeyMap => ({
        ...cacheKeyMap,
        [path]: Math.random()
      }))
    }
  }

  /**
   * 关闭当前tab左侧的所有tab
   * @param path
   */
  function dropLeftTabs(path: string) {
    const currentIndex = keepElements.current[path].index;

    const leftTabs = Object.entries(keepElements.current).filter(
      ([key, { index }]) => index < currentIndex
    );

    // 挨个删除
    leftTabs.forEach(([key, { index }]) => {
      dropByCacheKey(key);
    });

    // 遍历剩下的keepElements，修改它们的index
    Object.entries(keepElements.current).forEach(([key, item]) => {
      item.index = item.index - leftTabs.length;
    });
  }

  /**
   * 关闭当前tab右侧的所有tab
   * @param path
   */
  function dropRightTabs(path: string) {
    const currentIndex = keepElements.current[path].index;

    const rightTabs = Object.entries(keepElements.current).filter(
      ([key, { index }]) => index > currentIndex
    );

    // 挨个删除
    rightTabs.forEach(([key, { index }]) => {
      dropByCacheKey(key);
    });

    // 遍历剩下的keepElements，修改它们的index
    Object.entries(keepElements.current).forEach(([key, item], index) => {
      item.index = index;
    });
  }

  /**
   * 关闭除当前tab外的所有tab
   * @param path
   */
  function dropOtherTabs(path: string) {
    const currentIndex = keepElements.current[path].index;

    // 遍历keepElements
    Object.entries(keepElements.current).forEach(([key, { index }]) => {
      if (index != currentIndex) {
        dropByCacheKey(key);
      }
    });
    // 只剩当前tab，需要修改它的index为0
    keepElements.current[path].index = 0;
  }

  /**
   * 重载当前tab对应的页面
   * @param path
   */
  function refreshCurrentTab(path: string) {
    setCacheKeyMap((cacheKeyMap) => ({
      ...cacheKeyMap,
      [path]: Math.random(),
    }));
  }

  /**
   * 修改当前tab的name
   * @param path
   */
  function updateTabName(path: string, name: string) {
    if (keepElements.current[path]) {
      keepElements.current[path].name = name;

      setTabNameMap((tabNameMap) => ({
        ...tabNameMap,
        [path]: Math.random(),
      }));
    }
  }

  return (
    <KeepAliveContext.Provider
      value={ {
        keepalive,
        setKeepalive,
        keepElements,
        dropByCacheKey,
        cacheKeyMap,
        tabNameMap,
        dropLeftTabs,
        dropRightTabs,
        dropOtherTabs,
        refreshCurrentTab,
        updateTabName,
      }}
      {...props}
    />
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
