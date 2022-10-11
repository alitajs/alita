import { KeepAliveContext, useLocation, useParams } from 'alita';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { updateTabName } = React.useContext<any>(KeepAliveContext);
  const params = useParams();

  useEffect(() => {
    updateTabName(location.pathname, '详情' + params?.index);
  }, []);
  return (
    <div>
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
    </div>
  );
};
