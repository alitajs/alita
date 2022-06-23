import { Outlet, useLocation } from 'alita';
import { Button } from 'antd-mobile';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
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
      <Outlet />
    </div>
  );
};
