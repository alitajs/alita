import React from 'react';
import { KeepAliveContext } from './context';

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({})
  const [cacheKeyMap, setCacheKeyMap] = React.useState({})
  function dropByCacheKey(path: string) {
    if(keepElements.current[path]){
      delete keepElements.current[path];
      setCacheKeyMap(cacheKeyMap => ({
        ...cacheKeyMap,
        [path]: Math.random()
      }))
    }
  }
  return (
    <KeepAliveContext.Provider value={ { keepalive: [{{{ keepalive }}}], keepElements, dropByCacheKey, cacheKeyMap } } {...props}/>
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
