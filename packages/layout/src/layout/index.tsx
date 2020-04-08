import React, { useEffect, useState } from 'react';
import { Location, LocationState } from 'history';
// @ts-ignore
import { getPageNavBar, KeepAliveLayout, getTabBarList, layoutEmitter } from 'umi';

import AlitaLayout, {
  AlitaLayoutProps,
  NavBarProps,
  NavBarListItem,
  TabBarProps
} from '@alitajs/alita-layout';

interface BasicLayoutProps {
  layoutConfig: AlitaLayoutProps;
  hasKeepAlive: boolean;
  location: Location<LocationState>;
}
const changeNavBarConfig = (
  preConfig: NavBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const { navList, ...other } = preConfig as NavBarProps;
  if (!navList || navList!.length === 0) {
    const config = [] as NavBarListItem[];
    Object.keys(changeData).forEach(i => {
      config.push({
        pagePath: i,
        navBar: changeData[i],
      });
    });
    return { ...other, navList: config };
  }
  const newNavList = navList!.map(i => {
    if (changeData[i.pagePath]) {
      i.navBar = { ...i.navBar, ...changeData[i.pagePath] };
    }
    return i;
  });
  return { ...other, navList: newNavList };
};

const changeTabBarListConfig = (
  preConfig: TabBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const { list, ...other } = preConfig as TabBarProps;
  if (!list || list!.length === 0) {
    return preConfig;
  }
  const newNavList = list!.map(i => {
    if (changeData[i.pagePath]) {
      i = { ...i, ...changeData[i.pagePath] };
    }
    return i;
  });
  return { ...other, list: newNavList };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const [pageNavBar, setPageNavBar] = useState({});
  const [tabBarList, setTabBarList] = useState({});
  const { children, layoutConfig, hasKeepAlive, ...otherProps } = props;
  const { titleList, documentTitle, navBar, tabBar } = layoutConfig;
  useEffect(() => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
  }, [props.location.pathname]);
  layoutEmitter.useSubscription(()=>{
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
  })
  const newNavBar = changeNavBarConfig(navBar, pageNavBar);
  const newTabBarList = changeTabBarListConfig(tabBar, tabBarList);
  const layout = {
    documentTitle,
    navBar: newNavBar,
    tabBar: newTabBarList,
    titleList,
  };
  return (
    <AlitaLayout {...layout}>
      {hasKeepAlive && (
        <KeepAliveLayout {...otherProps}>{children}</KeepAliveLayout>
      )}
      {!hasKeepAlive && children}
    </AlitaLayout>
  );
};

export default BasicLayout;
