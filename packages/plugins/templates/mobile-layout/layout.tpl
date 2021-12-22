import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useOutlet
} from "react-router-dom";
import { getPluginManager } from '../core/plugin';

import {
  getPageNavBar,
  getTabBarList,
  layoutEmitter,
} from './layoutState';

import {
  request
} from '{{{ alitarequest }}}';

import AlitaLayout, {
  AlitaLayoutProps,
  NavBarProps,
  NavBarListItem,
  TabBarProps,
} from '{{{ alitalayout }}}';
import { useKeepOutlets } from '../plugin-keepalive/context';

interface BasicLayoutProps {
  hasKeepAlive: boolean;
  hideNavBar: boolean;
  location: any;
}
const changeNavBarConfig = (
  preConfig: NavBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const { navList, ...other } = preConfig as NavBarProps;
  if (!navList || navList!.length === 0) {
    const config = [] as NavBarListItem[];
    Object.keys(changeData).forEach((i) => {
      config.push({
        pagePath: i,
        navBar: changeData[i],
      });
    });
    return { ...other, navList: config };
  }
  let isChanged = false;
  const newNavList = navList!.map((i) => {
    if (changeData[i.pagePath]) {
      i.navBar = { ...i.navBar, ...changeData[i.pagePath] };
      isChanged = true;
    }
    return i;
  });
  if (isChanged) {
    return { ...other, navList: newNavList };
  }
  Object.keys(changeData).forEach((i) => {
    newNavList.push({
      pagePath: i,
      navBar: changeData[i],
    });
  });
  return { ...other, navList: newNavList };
};

const changeTabBarListConfig = (
  preConfig: TabBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const newChangeData = { ...changeData };
  const { list, ...other } = preConfig as TabBarProps;
  if (!list || list!.length === 0) {
    return preConfig;
  }

  const newNavList = [] as any[];
  list!.forEach((i) => {
    if (newChangeData[i.pagePath]) {
      const newPagePath = i.pagePath;
      i = { ...i, ...newChangeData[newPagePath] };
      if (newChangeData[newPagePath]?.replace) {
        i.pagePath = newChangeData[newPagePath]?.replace;
      }
      delete newChangeData[newPagePath];
      if (changeData[newPagePath]?.remove) return;
    }
    newNavList.push(i);
  });
  Object.keys(newChangeData).forEach((item: string) => {
    if (newChangeData[item]?.remove) return;
    newNavList.push(newChangeData[item]);
  });
  return { ...other, list: newNavList };
};

let prevPathName = '/';
const hasKeepAlive = {{{ hasKeepAlive }}};
const hideNavBar = {{{ isMicroApp }}};
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const [pageNavBar, setPageNavBar] = useState({});
  const [tabBarList, setTabBarList] = useState({});
  const { children, ...otherProps } = props;
  const location = useLocation();
  // mobile layout runtime config
  const runtime = getPluginManager().applyPlugins({ key: 'mobileLayout',type: 'modify', initialValue: {} });
  const { titleList, documentTitle, navBar, tabBar, onPageChange } = runtime;
  useEffect(() => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
    setTimeout(() => {
      onPageChange && onPageChange(request, location.pathname, prevPathName);
      prevPathName = location.pathname;
    }, 10);
  }, [location.pathname]);
  layoutEmitter?.useSubscription?.((e) => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
  });
  let element = useOutlet();
  if (hasKeepAlive) {
    element = useKeepOutlets();
  }
  const newNavBar = changeNavBarConfig(navBar, pageNavBar);
  const newTabBarList = changeTabBarListConfig(tabBar, tabBarList);
  const layout = {
    documentTitle,
    navBar: newNavBar,
    tabBar: newTabBarList,
    titleList,
    hideNavBar
  };
  return (
    <AlitaLayout {...layout}>
      {children}
      {element}
    </AlitaLayout>
  );
};

export default BasicLayout;
