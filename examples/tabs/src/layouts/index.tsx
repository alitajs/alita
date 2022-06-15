import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useKeepOutlets, useLocation, useNavigate } from 'alita';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('首页', '/', <PieChartOutlined />),
  getItem('用户', '/users', <UserOutlined />),
  getItem('其他', '/foo', <DesktopOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const element = useKeepOutlets();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: '32px',
            margin: '16px',
            color: '#fff',
            textAlign: 'center',
            fontSize: '16px',
          }}
        >
          Umi 4
        </div>
        <Menu
          onClick={(e) => {
            navigate(e?.key);
          }}
          theme="dark"
          defaultSelectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{element}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Umi@4 实战小册 Created by xiaohuoni
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
