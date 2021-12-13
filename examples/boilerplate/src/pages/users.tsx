import { Outlet } from '@umijs/renderer-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { KeepAliveContext } from '../.umi/plugin-keepalive/context';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { dropByCacheKey } = React.useContext<any>(KeepAliveContext);
  return (
    <div>
      <h2>users layout</h2>
      <div onClick={() => setCount(count + 1)}>{count}</div>
      <Outlet />
      <button onClick={() => dropByCacheKey(location.pathname)}>
        dropByCacheKey
      </button>
    </div>
  );
};
