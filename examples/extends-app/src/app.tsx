import HomeGary from '@/assets/demoIcon/home.png';
import HomeBlue from '@/assets/demoIcon/home1.png';
import ListGary from '@/assets/demoIcon/list.png';
import ListBlue from '@/assets/demoIcon/list1.png';
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
    console.log(11111111);
    console.log(error);
  },
};

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/hello',
    title: 'Hi',
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
    pagePath: '/hello',
    navBar: {
      pageBackground: '#e5e5e5',
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
    pagePath: '/hello',
    text: 'Hi',
    iconPath: ListGary,
    selectedIconPath: ListBlue,
    title: 'Hi',
    iconSize: '',
    badge: '',
  },
];

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
