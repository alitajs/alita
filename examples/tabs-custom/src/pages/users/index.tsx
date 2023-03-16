import {
  getLocale,
  history,
  KeepAliveContext,
  Outlet,
  setLocale,
  useIntl,
  useLocation,
} from 'alita';

import { Button } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const currentLang = getLocale();
  const intl = useIntl();
  const { dropByCacheKey, updateTab } = React.useContext<any>(KeepAliveContext);

  const handleClick = () => {
    updateTab(location.pathname, {
      name: 'hahaha' + Math.ceil((Math.random() * 100) / 10),
    });
  };

  const switchLang = () => {
    if (currentLang === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
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
      <Button
        color="primary"
        block
        size="large"
        onClick={() => history.push('/')}
      >
        打开首页
      </Button>
      <div>
        <span>当前语言: {currentLang}</span>
        <Button onClick={switchLang}>切换语言</Button>
      </div>
      <div>
        <span>测试locale文件是否生效: </span>
        <span>{intl.formatMessage({ id: 'tabs.close.left' })}</span>
      </div>
    </div>
  );
};
