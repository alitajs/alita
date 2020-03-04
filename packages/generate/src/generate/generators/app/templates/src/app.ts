import { ResponseError } from 'umi-request';
import {
  NavBarProps,
  TitleListItem,
  NarBarListItem,
  TarBarProps,
  TabBarListItem,
} from '@alitajs/alita-layout';

import HomeGary from './assets/demoIcon/home.png';
import HomeBlue from './assets/demoIcon/home1.png';
import ListGary from './assets/demoIcon/list.png';
import ListBlue from './assets/demoIcon/list1.png';
import SetGary from './assets/demoIcon/setting.png';
import SetBlue from './assets/demoIcon/setting1.png';

export const request = {
  prefix: '',
  method: 'post',
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};

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
    // router.goBack();
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

const tabBar: TarBarProps = {
  color: `#999999`,
  selectedColor: '#00A0FF',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};
