export default () => `import React, { useEffect, useState } from 'react';
import { Location, LocationState } from 'history';
// eslint-disable-next-line
import {
  getPageNavBar,
  KeepAliveLayout,
  getTabBarList,
  layoutEmitter,
  request,
  RequestMethodInUmi
} from '@@/core/umiExports';

import AlitaLayout, {
  AlitaLayoutProps,
  NavBarProps,
  NavBarListItem,
  TabBarProps,
} from '@alitajs/alita-layout';

interface ALitaLayoutProp extends AlitaLayoutProps {
  onPageChange?: (request: RequestMethodInUmi, pathname: string, prevPathName: string) => void;
}
interface BasicLayoutProps {
  layoutConfig: ALitaLayoutProp;
  hasKeepAlive: boolean;
  hideNavBar: boolean;
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
      if(changeData[i.pagePath]?.remove) return;
    }
    newNavList.push(i);
  });
  Object.keys(newChangeData).forEach((item: string) => {
    if(newChangeData[item]?.remove) return;
    newNavList.push(newChangeData[item]);
  });
  return { ...other, list: newNavList };
};

let prevPathName = '/';
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const [pageNavBar, setPageNavBar] = useState({});
  const [tabBarList, setTabBarList] = useState({});
  const { children, layoutConfig, hasKeepAlive, hideNavBar, ...otherProps } = props;
  const { titleList, documentTitle, navBar, tabBar, onPageChange } = layoutConfig;
  useEffect(() => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
    setTimeout(() => {
      onPageChange && onPageChange(request, props.location.pathname, prevPathName);
      prevPathName = props.location.pathname;
    }, 10);
  }, [props.location.pathname]);
  layoutEmitter?.useSubscription?.((e:T) => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
  });
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
      {hasKeepAlive && (
        <KeepAliveLayout {...otherProps}>{children}</KeepAliveLayout>
      )}
      {!hasKeepAlive && children}
    </AlitaLayout>
  );
};

export default BasicLayout;
`;
