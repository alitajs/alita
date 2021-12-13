import React from 'react';
import { KeepAliveContext } from './context';

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({})
  // keepElements.current[location.pathname] = element;
  function dropByCacheKey(path: string) {
    keepElements.current[path] = null;
  }
  return (
    <KeepAliveContext.Provider value={ { keepalive: [{{{ keepalive }}}], keepElements, dropByCacheKey } } {...props}/>
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
