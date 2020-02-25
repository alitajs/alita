import React from 'react';
// @ts-ignore
import { getPageNavBar } from 'umi';
import AlitaLayout, {
  AlitaLayoutProps,
  NavBarProps,
  NarBarListItem,
} from '@alitajs/alita-layout';

interface BasicLayoutProps {
  layoutConfig: AlitaLayoutProps;
}
const changeNavBarConfig = (
  preConfig: NavBarProps | undefined,
  changeData: {},
) => {
  if (!changeData) return preConfig;
  const { navList, ...other } = preConfig as NavBarProps;
  if (!navList || navList!.length === 0) {
    const config = [] as NarBarListItem[];
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
      i.navBar = changeData[i.pagePath];
    }
    return i;
  });
  return { ...other, navList: newNavList };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children, layoutConfig } = props;
  const { titleList, documentTitle, navBar, tabBar } = layoutConfig;
  const pageNavBar = getPageNavBar();
  const newNavBar = changeNavBarConfig(navBar, pageNavBar);
  const layout = {
    children,
    documentTitle,
    navBar: newNavBar,
    tabBar,
    titleList,
  };

  return <AlitaLayout {...layout} />;
};

export default BasicLayout;
