import routes from '@/routes';
import type { MenuDataItem, ProLayoutProps } from '@ant-design/pro-components';
import { ProLayout } from '@ant-design/pro-components';
import { Link, useKeepOutlets, useLocation } from 'alita';
import type { ReactNode } from 'react';
import { FC } from 'react';

const MenuItem: ProLayoutProps['menuItemRender'] = (
  menuItemProps: MenuDataItem,
  defaultDom: ReactNode,
) => {
  if (!menuItemProps?.path) {
    return defaultDom;
  }

  return <Link to={menuItemProps.path}>{defaultDom}</Link>;
};

const App: FC = () => {
  const { pathname } = useLocation();
  const element = useKeepOutlets();

  return (
    <ProLayout
      location={{
        pathname,
      }}
      menuItemRender={MenuItem}
      route={{
        path: '/',
        routes,
      }}
    >
      {element}
    </ProLayout>
  );
};

export default App;
