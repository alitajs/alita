import type {
  NavBarListItem,
  NavBarProps,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'alita';

export const request = {
  prefix: '/api',
  method: 'get',
  errorHandler: (error) => {
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
    pagePath: '/users',
    title: '列表',
  },
  {
    pagePath: '/users/foo',
    title: '设置',
  },
];
const navList: NavBarListItem[] = [
  {
    pagePath: '/',
    navBar: {
      pageBackground: '#fff',
    },
  },
  {
    pagePath: '/users',
    navBar: {
      pageBackground: '#000',
    },
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: false,
  onLeftClick: () => {
    // router.goBack();
  },
};
const tabList: TabBarListItem[] = [];

const tabBar: TabBarProps = {
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
