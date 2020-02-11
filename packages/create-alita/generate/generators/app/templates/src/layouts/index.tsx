import React from 'react';
import AlitaLayout, {
  NavBarProps,
  TitleListItem,
  NarBarListItem,
  TarBarProps,
  TabBarListItem,
} from '@alitajs/alita-layout';
import { router } from 'alita';
import HomeGary from './demoIcon/home.png';
import HomeBlue from './demoIcon/home1.png';
import ListGary from './demoIcon/list.png';
import ListBlue from './demoIcon/list1.png';
import SetGary from './demoIcon/setting.png';
import SetBlue from './demoIcon/setting1.png';

// import styles from './index.less';

const BasicLayout: React.FC = ({ children }) => {
  const titleList: TitleListItem[] = [
    {
      pagePath: '/',
      title: '首页',
    },
    {
      pagePath: '/list',
      title: '列表',
    },
    {
      pagePath: '/settings',
      title: '设置',
    },
  ];
  const navList: NarBarListItem[] = [];
  const navBar: NavBarProps = {
    navList,
    fixed: true,
    onLeftClick: () => {
      router.goBack();
    },
  };
  const tabList: TabBarListItem[] = [
    {
      pagePath: '/',
      text: '首页',
      iconPath: HomeGary,
      selectedIconPath: HomeBlue,
      title: '首页',
      iconSize: '',
      badge: '',
    },
    {
      pagePath: '/list',
      text: '列表',
      iconPath: ListGary,
      selectedIconPath: ListBlue,
      title: '列表',
      iconSize: '',
      badge: '',
    },
    {
      pagePath: '/settings',
      text: '设置',
      iconPath: SetGary,
      selectedIconPath: SetBlue,
      title: '设置',
      iconSize: '',
      badge: '',
    },
  ];

  const tarBar: TarBarProps = {
    color: `#999999`,
    selectedColor: '#00A0FF',
    borderStyle: 'white',
    position: 'bottom',
    list: tabList,
  };
  const layout = {
    children,
    documentTitle: '默认标题',
    navBar,
    tarBar,
    titleList,
  };

  return <AlitaLayout {...layout} />;
};

export default BasicLayout;
