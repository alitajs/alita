import { history, KeepAliveContext, Outlet, useLocation } from 'umi';

import { Button } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { dropByCacheKey, updateTabName } =
    React.useContext<any>(KeepAliveContext);

  const handleClick = () => {
    updateTabName(location.pathname, 'hahaha');
  };
  return (
    <div>
      <h2>users layout</h2>
      <h3>当前页面状态被设置成自动保存</h3>
      <h3>当前计数是：{count}</h3>
      <Button
        color="primary"
        block
        size="large"
        onClick={() => setCount(count + 1)}
      >
        点我计数加1
      </Button>
      <h3
        onClick={() => {
          history.push('/');
        }}
      >
        点我返回首页，记得回来看当前页面状态有没有被保存哦
      </h3>
      <Outlet />
      <Button onClick={() => dropByCacheKey(location.pathname)}>
        清除当前页面缓存
      </Button>
      <Button onClick={handleClick}>修改tabName</Button>
    </div>
  );
};
