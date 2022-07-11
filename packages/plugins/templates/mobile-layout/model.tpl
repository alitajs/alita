import type { NavBarListItem } from './AlitaLayout';

let pageNavBar = {};
let tabBarList = {};

type Subscription<T> = (val: T) => void;

class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of this.subscriptions) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    function subscription(val: T) {
      if (callback) {
        callback(val);
      }
    }
    this.subscriptions.add(subscription);
  };
}
const layoutEmitter = new EventEmitter();

const setPageNavBar = (value: NavBarListItem) => {
  if (!value.pagePath || !value.navBar) {
    console.error('setPageNavBar: value.pagePath can not be undefined')
    return;
  }
  pageNavBar = { ...pageNavBar, [value.pagePath]: value.navBar }
  layoutEmitter.emit('');
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
  remove?: boolean;
  replace?: string;
}

const checkPagePath = (pagePath: string | undefined) => {
  if(!pagePath) {
    console.error('setTabBarList: value.pagePath can not be undefined');
    return false;
  } else return true;

}

const setTabBarList = (value: TabBarListItem | TabBarListItem[]): void => {
  if(Array.isArray(value)){
    value.forEach((item: TabBarListItem) => {
      tabBarList[item.pagePath] = item;
    });
  }  else {
    if (!checkPagePath(value.pagePath)) return;
    tabBarList = { ...tabBarList, [value.pagePath]: value };
  }
  layoutEmitter.emit('');
}

const getTabBarList = () => tabBarList;

export {
  getPageNavBar, setPageNavBar, setTabBarList, getTabBarList, layoutEmitter
}