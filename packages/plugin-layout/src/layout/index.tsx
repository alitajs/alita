import React, { useState, useEffect } from 'react';
// @ts-ignore
import { Link, useModel, history } from 'umi';
import ProLayout, { BasicLayoutProps } from '@ant-design/pro-layout';
import './style.less';
import ErrorBoundary from '../component/ErrorBoundary';
import renderRightContent from './renderRightContent';
import { WithExceptionOpChildren } from '../component/Exception';
import { getMatchMenu, MenuDataItem, transformRoute } from '@umijs/route-utils';
// @ts-ignore
import logo from '../component/logo';
import { formatMessage } from '../utils/intl';

const getLayoutRender = (currentPathConfig: {
  layout:
    | {
        hideMenu: boolean;
        hideNav: boolean;
        hideFooter: boolean;
      }
    | false;
  hideFooter: boolean;
}) => {
  const layoutRender: any = {};

  if (currentPathConfig?.hideFooter) {
    layoutRender.footerRender = false;
  }

  if (currentPathConfig?.layout == false) {
    layoutRender.pure = true;
    return layoutRender;
  }

  if (currentPathConfig?.layout?.hideMenu) {
    layoutRender.menuRender = false;
  }

  if (currentPathConfig?.layout?.hideFooter) {
    layoutRender.footerRender = false;
  }

  if (currentPathConfig?.layout?.hideNav) {
    layoutRender.headerRender = false;
  }

  return layoutRender;
};

const BasicLayout = (props: any) => {
  const { children, userConfig, location, route, ...restProps } = props;
  const initialInfo = (useModel && useModel('@@initialState')) || {
    initialState: undefined,
    loading: false,
    setInitialState: null,
  };

  // plugin-initial-state 未开启
  const { initialState, loading, setInitialState } = initialInfo;
  const [currentPathConfig, setCurrentPathConfig] = useState<MenuDataItem>({});

  useEffect(() => {
    const { menuData } = transformRoute(
      props?.route?.routes || [],
      undefined,
      undefined,
      true,
    );
    // 动态路由匹配
    const currentPathConfig = getMatchMenu(location.pathname, menuData).pop();
    setCurrentPathConfig(currentPathConfig || {});
  }, [location.pathname]);

  // layout 是否渲染相关
  const layoutRestProps: BasicLayoutProps & {
    rightContentRender?:
      | false
      | ((
          props: BasicLayoutProps,
          dom: React.ReactNode,
          config: any,
        ) => React.ReactNode);
  } = {
    itemRender: route => <Link to={route.path}>{route.breadcrumbName}</Link>,
    ...userConfig,
    ...restProps,
    ...getLayoutRender(currentPathConfig as any),
  };

  return (
    <ProLayout
      route={route}
      location={location}
      title={userConfig.name || userConfig.title}
      className="umi-plugin-layout-main"
      navTheme="dark"
      siderWidth={256}
      onMenuHeaderClick={e => {
        e.stopPropagation();
        e.preventDefault();
        history.push('/');
      }}
      menu={{ locale: userConfig.locale }}
      // 支持了一个 patchMenus，其实应该用 menuDataRender
      menuDataRender={
        userConfig.patchMenus
          ? menuData => userConfig.patchMenus(menuData, initialInfo)
          : undefined
      }
      formatMessage={formatMessage}
      logo={logo}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }
        if (menuItemProps.path) {
          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }
        return defaultDom;
      }}
      disableContentMargin
      fixSiderbar
      fixedHeader
      {...layoutRestProps}
      rightContentRender={
        // === false 应该关闭这个功能
        layoutRestProps?.rightContentRender !== false &&
        (layoutProps => {
          const dom = renderRightContent(
            userConfig,
            loading,
            initialState,
            setInitialState,
          );
          if (layoutRestProps.rightContentRender) {
            return layoutRestProps.rightContentRender(layoutProps, dom, {
              userConfig,
              loading,
              initialState,
              setInitialState,
            });
          }
          return dom;
        })
      }
    >
      <ErrorBoundary>
        <WithExceptionOpChildren currentPathConfig={currentPathConfig}>
          {userConfig.childrenRender
            ? userConfig.childrenRender(children)
            : children}
        </WithExceptionOpChildren>
      </ErrorBoundary>
    </ProLayout>
  );
};

export default BasicLayout;
