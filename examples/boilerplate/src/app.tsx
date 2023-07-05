import HomeGary from '@/assets/demoIcon/home.png';
import HomeBlue from '@/assets/demoIcon/home1.png';
import ListGary from '@/assets/demoIcon/list.png';
import ListBlue from '@/assets/demoIcon/list1.png';
import SetGary from '@/assets/demoIcon/setting.png';
import SetBlue from '@/assets/demoIcon/setting1.png';
import type {
  NavBarListItem,
  NavBarProps,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'alita';
import { history } from 'alita';

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
    pagePath: '/users',
    text: '列表',
    iconPath: ListGary,
    selectedIconPath: ListBlue,
    title: '列表',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/foo/1232',
    text: '设置',
    iconPath: SetGary,
    selectedIconPath: SetBlue,
    title: '设置',
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
  // customHeader:<div>asdasdassaasd</div>
};

export async function getKeepAlive(keepaliva: any[]) {
  console.log('getKeepAlive');
  console.log(keepaliva);
  return [/./];
}

export function render(oldRender: any) {
  console.log('history');
  console.log(history);
  oldRender();
}
