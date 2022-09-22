import React from 'react';
import { KeepAliveContext } from './context';
{{#hasGetKeepalive}}
  
import { getKeepAlive } from '@/app';
{{/hasGetKeepalive}}

const KeepAliveLayout = (props)=>{
  const keepElements = React.useRef<any>({})
  const [cacheKeyMap, setCacheKeyMap] = React.useState({})
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
  return (
    <KeepAliveContext.Provider value={ { keepalive, setKeepalive, keepElements, dropByCacheKey, cacheKeyMap } } {...props}/>
  )
}
export function rootContainer(container) {
  return React.createElement(KeepAliveLayout, null, container);
}
