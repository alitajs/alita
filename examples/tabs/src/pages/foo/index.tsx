import { UserOutlined } from '@ant-design/icons';
import { KeepAliveContext, useLocation, useParams } from 'alita';
import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const { updateTab } = React.useContext(KeepAliveContext);
  const params = useParams();

  useEffect(() => {
    updateTab(location.pathname, { name: '详情' + params?.index });
  }, []);

  const handleClick = () => {
    updateTab(location.pathname, {
      icon: <UserOutlined />,
      name: 'hahaha' + Math.ceil((Math.random() * 100) / 10),
      closable: false,
    });
  };

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
      <Button onClick={handleClick}>修改tab</Button>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
      <h1>当前页面状态被设置成自动保存</h1>
    </div>
  );
};
