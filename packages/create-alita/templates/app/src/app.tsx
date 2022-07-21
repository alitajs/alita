import HomeGary from '@/assets/demoIcon/home.png';
import HomeBlue from '@/assets/demoIcon/home1.png';
import ListGary from '@/assets/demoIcon/list.png';
import ListBlue from '@/assets/demoIcon/list1.png';
import SetGary from '@/assets/demoIcon/setting.png';
import SetBlue from '@/assets/demoIcon/setting1.png';
import type {
  Context,
  NavBarListItem,
  NavBarProps,
  ResponseError,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'alita';
import { history } from 'alita';

// 请求中间件 就是发起请求和响应之后需要统一操作数据就写这
// https://github.com/umijs/umi-request#example-1
const middleware = async (ctx: Context, next: () => void) => {
  // 可以在这写一些请求前做的事情 操作ctx.req
  await next();
  // 可以在这里对响应数据做一些操作 操作ctx.res
};

export const request = {
  prefix: '',
  // method: 'get', // 修改默认的请求方式
  middlewares: [middleware],
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};

// 页面标题，也可以通过页面级别修改
const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/property',
    title: '资产',
  },
  {
    pagePath: '/life',
    title: '生活',
  },
  {
    pagePath: '/message',
    title: '消息',
  },
  {
    pagePath: '/my',
    title: '我的',
  },
];
const navList: NavBarListItem[] = [];
const navBar: NavBarProps = {
  navList,
  fixed: false,
  onLeftClick: () => {
    history.back();
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
    pagePath: '/property',
    text: '资产',
    iconPath: HomeGary,
    selectedIconPath: HomeBlue,
    title: '资产',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/life',
    text: '生活',
    iconPath: HomeGary,
    selectedIconPath: HomeBlue,
    title: '生活',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/message',
    text: '消息',
    iconPath: ListGary,
    selectedIconPath: ListBlue,
    title: '消息',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/my',
    text: '我的',
    iconPath: SetGary,
    selectedIconPath: SetBlue,
    title: '我的',
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
