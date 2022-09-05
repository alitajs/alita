import React from 'react';
import { KeepAliveContext } from './context';
import * as app from '@/app';

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({})
  const [cacheKeyMap, setCacheKeyMap] = React.useState({})
  const [keepalive, setKeepalive] = React.useState([{{{ keepalive }}}]);
  const init = async() => {
    if (app?.getKeepAlive) {
      try {
        const runtime = await app?.getKeepAlive(keepalive);
        setKeepalive(runtime);
      } catch (error) {
        console.error(error);
      }
    }
  }

  React.useEffect(()=>{
    init();
  },[])
    
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
    <KeepAliveContext.Provider value={ { keepalive, setKeepalive, keepElements, dropByCacheKey, cacheKeyMap } } {...props}/>
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
