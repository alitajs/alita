export default () => `
import { NavBarListItem } from '@alitajs/alita-layout';

let pageNavBar = {};
let tabBarList = {};
const setPageNavBar = (value: NavBarListItem) => {
  if (!value.pagePath || !value.navBar) {
    console.error('setPageNavBar: value.pagePath can not be undefined')
    return;
  }
  pageNavBar = { ...pageNavBar, [value.pagePath]: value.navBar }
}
const getPageNavBar = () => pageNavBar;

interface TabBarListItem {
  pagePath: string;
  text?: string;
  iconSize?: string;
  badge?: string;
  iconPath?: string;
  selectedIconPath?: string;
  onPress?: () => {};
  title?: string;
}
const setTabBarList = (value: TabBarListItem) => {
  if (!value.pagePath) {
    console.error('setTabBarList: value.pagePath can not be undefined')
    return;
  }
  tabBarList = { ...tabBarList, [value.pagePath]: value }
}
const getTabBarList = () => tabBarList;

export {
  getPageNavBar, setPageNavBar, setTabBarList, getTabBarList
}
`;
