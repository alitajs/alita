import { KeepAliveContext } from '@@/plugin-keepalive';
import { Outlet, useLocation } from 'alita';
import { Button } from 'antd-mobile';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { dropByCacheKey } = React.useContext<any>(KeepAliveContext);
  return (
    <div>
      <h2>users layout</h2>
      <h3>当前页面状态被设置成自动保存</h3>
      <h3>当前计数是：{count}</h3>
      <Button
        type="button"
        color="primary"
        fill="solid"
        block
        size="large"
        onClick={() => setCount(count + 1)}
      >
        点我计数加1
      </Button>
      <h3>
        点击底部的 tabs 切换试试效果吧，记得回来看当前页面状态有没有被保存哦
      </h3>
      <Outlet />
      <Button onClick={() => dropByCacheKey(location.pathname)}>
        清除当前页面缓存
      </Button>
    </div>
  );
};
