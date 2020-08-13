import React, { FC,useEffect } from 'react';
import ProLayout, { MenuDataItem, BasicLayoutProps } from '@ant-design/pro-layout';
{{#hasAccess}}
import accessFactory from '@/access';
{{/hasAccess}}
// @ts-ignore
import { traverseModifyRoutes } from '{{{ utilsPath }}}';
import { transformRoute } from '@umijs/route-utils';
import { Link } from 'umi';
{{#useModel}}
import { useModel } from 'umi';
{{/useModel}}
{{#hasLocale}}
import { useIntl } from 'umi';
{{/hasLocale}}
import { WithExceptionOpChildren } from './components';
{{{ importIcons }}}

export interface LayoutConfigProps extends BasicLayoutProps {
  hasLocale?: boolean; // 是否使用 locale
  iconNames?:string[];// 约定式的用法，用到的 icon 要提前在这里写明
  renderMenuData?: (menu: MenuDataItem[], serveMenu: MenuDataItem[], ) => MenuDataItem[];
}
export interface AccessLayoutProps extends BasicLayoutProps {
  menuData?: MenuDataItem[];
  initState?: any;
  hasLocale?: boolean;
  layoutConfig?: LayoutConfigProps;
  renderMenuData?: (menu: MenuDataItem[], serveMenu: MenuDataItem[], ) => MenuDataItem[];
}
// 运行时动态生成这个 Map
// const IconMap = {
//   smile: <SmileOutlined />,
//   heart: <HeartOutlined />,
// };
const IconMap = {
{{{ useIcons }}}
};
// 替换服务端数据中的icon
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, children, ...item }) => ({
    ...item,
    icon: icon && IconMap[icon as string],
    children: children && loopMenuItem(children),
  }));

const style = {
  height: '100vh',
}
const AccessLayout: FC<AccessLayoutProps> = ({ menuData: serveMenuData, location, children, initState, hasLocale = false, layoutConfig = {},route, renderMenuData, ...other }) => {

{{#useModel}}
  const { layoutConfig: pageSetLayoutConfig } = useModel('@@accessLayout');
{{/useModel}}
  const { hasLocale:runtimeHasLocale, renderMenuData: runtimeRenderMenuData, ...otherConfig } = layoutConfig;
  const tryeRenderMenuData = renderMenuData || runtimeRenderMenuData || ((a, b) => a);

{{#hasLocale}}
  const intl = useIntl();
{{/hasLocale}}
  const { pathname } = location!;
{{#hasAccess}}
{{#useModel}}
  // plugin-initial-state 未开启
  // @ts-ignore
  const initialInfo = useModel('@@initialState') || {
    initialState: undefined,
    loading: false,
    setInitialState: null,
  };
  const { access: layoutAccess, setAccess } = useModel('@@accessLayout');
  const { initialState } = initialInfo;
  // @ts-ignore
  const { menu: serveMenu = [] } = initialState;
  const localeMenu = serveMenuData || route?.routes || [];
  const menu = tryeRenderMenuData(localeMenu.concat(), serveMenu);
{{/useModel}}
{{#noModel}}
  const initialState = null;
  const localeMenu = serveMenuData || route?.routes || [];
  const menu = localeMenu.concat();
{{/noModel}}
  const access = accessFactory(initState||initialState||{});
  const accessMenu = traverseModifyRoutes(menu, access);
  const trueHasLocale  = hasLocale || runtimeHasLocale || {{{ hasLocale }}};
{{#hasLocale}}
  const { menuData, breadcrumb } = transformRoute(accessMenu,trueHasLocale , intl.formatMessage);
{{/hasLocale}}
{{#noLocale}}
   const { menuData, breadcrumb } = transformRoute(accessMenu,false);
{{/noLocale}}
{{#useModel}}
  useEffect(() => {
    if (JSON.stringify(layoutAccess) !== JSON.stringify(access)) {
      setAccess(access);
    }
  }, [JSON.stringify(access)])
{{/useModel}}
{{/hasAccess}}
{{#noAccess}}
{{#useModel}}
  const { access: layoutAccess, menu:serveMenu } = useModel('@@accessLayout');
  const localeMenu = serveMenuData || route?.routes || [];
  const menu = tryeRenderMenuData(localeMenu.concat(), serveMenu);
  const accessMenu = traverseModifyRoutes(menu, layoutAccess);
  // @ts-ignore
  const { menuData, breadcrumb } = transformRoute(accessMenu, locale || useLocale, intl && intl.formatMessage, false);
{{/useModel}}
{{#noModel}}
  // @ts-ignore
  const { menuData, breadcrumb } = transformRoute(serveMenuData||route?.routes, locale || useLocale, intl && intl.formatMessage, false);
{{/noModel}}
{{/noAccess}}
  const currentPathConfig = breadcrumb.get(pathname!);

  if(currentPathConfig?.hideLayout){
    return <>{children}</>
  }
  return <ProLayout
    location={location}
    menuItemRender={(menuItemProps, defaultDom) => {
      if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
        return defaultDom;
      }
      return <Link to={menuItemProps.path}>{defaultDom}</Link>;
    }}
    {...other}
    {...otherConfig}
{{#useModel}}
    {...pageSetLayoutConfig}
{{/useModel}}
    menuDataRender={() => loopMenuItem(menuData as MenuDataItem[])}
  >
    <div
      style={style}
    >
      <WithExceptionOpChildren currentPathConfig={currentPathConfig}>
        {children}
      </WithExceptionOpChildren>
    </div>
  </ProLayout>

}

export { AccessLayout };
