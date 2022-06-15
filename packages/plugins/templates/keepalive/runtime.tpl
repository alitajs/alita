import React from 'react';
import { KeepAliveContext } from './context';

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({})

  function dropByCacheKey(path: string) {
    if(keepElements.current[path]){
      delete keepElements.current[path];
    }
  }
  return (
    <KeepAliveContext.Provider value={ { keepalive: [{{{ keepalive }}}], keepElements, dropByCacheKey } } {...props}/>
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
