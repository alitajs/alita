import React from 'react';
import { KeepAliveContext, 
{{#hasTabsLayout}}
  TabConfig
{{/hasTabsLayout}}
} from './context';
{{#hasGetKeepalive}}
import { getKeepAlive } from '@/app';
{{/hasGetKeepalive}}

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({});
  const [cacheKeyMap, setCacheKeyMap] = React.useState({});
{{#hasTabsLayout}}
  const [tabNameMap, setTabNameMap] = React.useState({});
{{/hasTabsLayout}}
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
    if(keepElements.current[path.toLowerCase()]){
      delete keepElements.current[path.toLowerCase()];
      setCacheKeyMap(cacheKeyMap => ({
        ...cacheKeyMap,
        [path.toLowerCase()]: Math.random()
      }))
    }
  }
{{#hasTabsLayout}}
  /**
   * 关闭当前tab左侧的所有tab
   * @param path
   */
  function dropLeftTabs(path: string) {
    const currentIndex = keepElements.current[path.toLowerCase()].index;

    const leftTabs = Object.entries(keepElements.current).filter(
      ([_, { index, closable }]) => index < currentIndex & closable
    );

    // 挨个删除
    leftTabs.forEach(([key]) => {
      dropByCacheKey(key);
    });

    // 遍历剩下的keepElements，修改它们的index
    Object.entries(keepElements.current).forEach(([_, item]) => {
      item.index = item.index - leftTabs.length;
    });
  }

  /**
   * 关闭当前tab右侧的所有tab
   * @param path
   */
  function dropRightTabs(path: string) {
    const currentIndex = keepElements.current[path.toLowerCase()].index;

    const rightTabs = Object.entries(keepElements.current).filter(
      ([_, { index, closable }]) => index > currentIndex & closable
    );

    // 挨个删除
    rightTabs.forEach(([key]) => {
      dropByCacheKey(key);
    });

    // 遍历剩下的keepElements，修改它们的index
    Object.entries(keepElements.current).forEach(([_, item], index) => {
      item.index = index;
    });
  }

  /**
   * 关闭除当前tab外的所有tab
   * @param path
   */
  function dropOtherTabs(path: string) {
    const currentIndex = keepElements.current[path.toLowerCase()].index;

    // 遍历keepElements
    Object.entries(keepElements.current).forEach(([key, { index, closable }]) => {
      if (index != currentIndex & closable) {
        dropByCacheKey(key);
      }
    });
    // 只剩当前tab，需要修改它的index为0
    keepElements.current[path.toLowerCase()].index = 0;
  }

  /**
   * 重载tab页面
   * @param path
   */
  function refreshTab(path: string) {
    setCacheKeyMap((cacheKeyMap) => ({
      ...cacheKeyMap,
      [path.toLowerCase()]: Math.random(),
    }));
  }

  /**
   * 修改当前tab
   * @param path
   */
  function updateTab(path: string, config: TabConfig) {
    if (keepElements.current[path.toLowerCase()]) {
      keepElements.current[path.toLowerCase()] = {
        ...keepElements.current[path.toLowerCase()],
        ...config,
      }

      setTabNameMap((tabNameMap) => ({
        ...tabNameMap,
        [path.toLowerCase()]: Math.random(),
      }));
    }
  }
{{/hasTabsLayout}}
  return (
    <KeepAliveContext.Provider
      value={ {
        keepalive,
        setKeepalive,
        keepElements,
        cacheKeyMap,
        dropByCacheKey,
{{#hasTabsLayout}}
        tabNameMap,
        dropLeftTabs,
        dropRightTabs,
        dropOtherTabs,
        refreshTab,
        updateTab,
{{/hasTabsLayout}}
      }}
      {...props}
    />
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
