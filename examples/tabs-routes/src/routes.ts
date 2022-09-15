import { MenuDataItem } from '@ant-design/pro-components';

const routes: MenuDataItem[] = [
  {
    name: '首页',
    path: '/',
    component: 'index',
    isKeepalive: true,
  },
  {
    name: '用户',
    path: '/users',
    component: 'users',
    isKeepalive: true,
  },
  {
    name: '其他',
    path: 'foo',
    component: 'foo',
    isKeepalive: true,
  },
  {
    name: '示例 1',
    path: 'demo1',
    routes: [
      {
        name: '示例 11',
        path: '/demo1/demo11',
        component: 'demo1/demo11',
        isKeepalive: true,
      },
      {
        name: '示例 12',
        path: 'demo12',
        component: 'demo1/demo12',
        isKeepalive: true,
      },
    ],
  },
  {
    name: '示例 2',
    path: 'demo2',
    routes: [
      {
        name: '示例 21',
        path: 'demo21',
        routes: [
          {
            name: '示例 211',
            path: 'demo211',
            component: 'demo2/demo21/demo211',
            isKeepalive: true,
          },
        ],
      },
    ],
  },
];

export default routes;
