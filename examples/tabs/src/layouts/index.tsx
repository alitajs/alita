import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { useKeepOutlets, useLocation, useNavigate } from 'alita';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';

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
  getItem('大小写', '/lowerCase', <UserOutlined />),
  getItem('用户', '/users', <UserOutlined />),
  getItem('其他123', '/foo/123', <DesktopOutlined />),
  getItem('其他456', '/foo/456', <DesktopOutlined />),
];

const App: React.FC = () => {
  const element = useKeepOutlets();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(location.pathname);

  // 监听路由变化，激活路由对应的菜单
  useEffect(() => {
    const item = items.find((item) => item && item.key === location.pathname);
    if (item) {
      setActiveItem(item.key as string);
    }
  }, [location.pathname]);

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
          defaultSelectedKeys={[activeItem]}
          selectedKeys={[activeItem]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header />
        <div style={{ height: 'calc(100vh - 64px)', overflowY: 'auto' }}>
          <Content>
            <div>{element}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Umi@4 实战小册 Created by xiaohuoni
          </Footer>
        </div>
      </Layout>
    </Layout>
  );
};

export default App;
