import React from 'react';
import { Result, Button } from 'antd';
import { history } from 'umi';
import { IRouteLayoutConfig } from '../../types/interface.d';

function backToHome() {
  history.push('/');
}

const Exception404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，你访问的页面不存在"
    extra={
      <Button type="primary" onClick={backToHome}>
        返回首页
      </Button>
    }
  />
);

const Exception500 = () => (
  <Result
    status="500"
    title="500"
    subTitle="抱歉，服务器出错了"
    extra={
      <Button type="primary" onClick={backToHome}>
        返回首页
      </Button>
    }
  />
);

const Exception403 = () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，你无权访问该页面"
    extra={
      <Button type="primary" onClick={backToHome}>
        返回首页
      </Button>
    }
  />
);

/**
 * 异常路由处理组件
 * - 无权限
 * - 404
 */
const WithExceptionOpChildren: React.FC<{
  currentPathConfig?: IRouteLayoutConfig;
  children: any;
}> = props => {
  const { children, currentPathConfig } = props;

  // 404 现在应该很少会发生
  if (!currentPathConfig) {
    return <Exception404 />;
  }
  /**
   * 这里是没有权限的意思
   */
  if (currentPathConfig.unAccessible || currentPathConfig.unaccessible) {
    return <Exception403 />;
  }
  return children;
};

export { Exception404, Exception403, Exception500, WithExceptionOpChildren };
