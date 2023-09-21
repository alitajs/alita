import React, { useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useOutlet,
  Outlet
} from "react-router-dom";
import { getPluginManager } from '../core/plugin';

import {
  getPageNavBar,
  getTabBarList,
  layoutEmitter,
} from './layoutState';

import {
  request
} from '{{{ alitarequest }}}';

{{#hasKeepAlive}}
import { useKeepOutlets } from '../plugin-keepalive/context';
{{/hasKeepAlive}}

import { NavBar, TabBar } from '{{{ antdMobile }}}';
import { LeftOutline } from '{{{ mobileicons }}}'

export interface NavBarListItem {
    pagePath: string;
    navBar: NavBarProps;
}

export interface NavBarProps extends React.HTMLProps<HTMLDivElement> {
    mode?: 'dark' | 'light';
    prefixCls?: string;
    className?: string;
    back?: string;
    icon?: React.ReactNode;
    backArrow?: React.ReactNode;
    leftContent?: React.ReactNode;
    left?: React.ReactNode;
    rightContent?: React.ReactNode;
    right?: React.ReactNode;
    onLeftClick?: (navigate) => void;
    onBack?: (navigate) => void;
    navList?: NavBarListItem[];
    hideNavBar?: boolean;
    fixed?: boolean;
    pageTitle?: string;
    pageBackground?: string;
    style?: React.CSSProperties;
}
export interface Match<Params extends { [K in keyof Params]?: string } = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
}

export interface TabBarListItem {
    pagePath: string;
    text?: string;
    iconSize?: string;
    badge?: string;
    iconPath?: string;
    selectedIconPath?: string;
    onPress?: () => void;
    title?: string;
    icon?: React.ReactNode;
    selectedIcon?: React.ReactNode;
}
export interface TitleListItem {
    pagePath: string;
    title: string;
}
export interface TabBarProps {
    list: TabBarListItem[];
    color?: string;
    selectedColor?: string;
    backgroungColor?: string;
    backgroundColor?: string;
    position?: 'bottom' | 'top';
    borderStyle?: string;
    tabsGroup?: string[][];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function useDocumentTitle(title: string) {
    useEffect(() => {
        const originalTitle = document.title;
        document.title = title;

        return () => {
            document.title = originalTitle;
        };
    }, [title]);
}
export interface AlitaLayoutProps<
    Params extends { [K in keyof Params]?: string } = {},
    > {
    match: Match<Params>;
    tabBar?: TabBarProps;
    documentTitle?: string;
    titleList?: TitleListItem[];
    navBar?: NavBarProps;
    hideNavBar?: boolean;
}
const checkNavBarList = (
    pagePath: string,
    lists: NavBarListItem[],
): NavBarProps | null => {
    const page = lists.filter(
        item => item.pagePath === pagePath && !!item.navBar,
    );
    if (page && page.length > 0) {
        return page[0].navBar;
    }
    return null;
};
const checkTabsList = (
    pagePath: string,
    lists: TabBarListItem[],
    tabsGrouping?: string[][],
): { hasTabsBar: boolean; pageTitle?: string; realList: TabBarListItem[] } => {
    let realList = lists;
    let realGroup;
    const page = lists.filter(
        (item: { pagePath: string }) => item.pagePath === pagePath,
    );

    if (tabsGrouping && tabsGrouping.length > 0) {
        tabsGrouping.forEach(tabsGroup => {
            if (page[0] && tabsGroup.includes(page[0].pagePath)) {
                realGroup = tabsGroup;
            }
        });
    }

    if (realGroup) {
        realList = lists.filter((item: { pagePath: string }) =>
            realGroup.includes(item.pagePath),
        );
    }

    return {
        hasTabsBar: page && page.length > 0,
        pageTitle: page[0] ? page[0].title || page[0].text : '',
        realList,
    };
};

const checkTitleList = (pagePath: string, lists: TitleListItem[]): string => {
    const page = lists.filter(
        (item: { pagePath: string }) => item.pagePath === pagePath,
    );
    return page[0] ? page[0].title : '';
};

const headerRender = ({
    realNavBar,
    hasTabsBar,
    realTitle,
    navigate,
}: {
    hasTabsBar: boolean;
    realNavBar: NavBarProps;
    realTitle: string;
    navigate: any;
}): React.ReactNode => {
    const defaultIcon = hasTabsBar ? null : <LeftOutline />;
    const {
        mode,
        back,
        icon,
        backArrow,
        onLeftClick,
        onBack,
        rightContent,
        left,
        right,
        leftContent,
        hideNavBar,
        className,
        pageTitle,
        style = {}
    } = realNavBar;
    const defaultEvent = onBack || onLeftClick || (!hasTabsBar ? navigate.back : () => { });
    if (hideNavBar === true) {
        return null;
    }
    const modeStyle = mode === 'light' ? {} : {
        background: 'var(--adm-color-primary)',
        color: '#FFF'
    }
    return (
        <>
            <div
                className="alita-head alita-layout-head"
            >
                <NavBar
                    style={ { width: '100%',...modeStyle, ...style } }
                    backArrow={backArrow || icon || defaultIcon}
                    onBack={() => defaultEvent(navigate)}
                    right={right || rightContent}
                    left={left || leftContent}
                    back={back}
                    className={className}
                >
                    {pageTitle || realTitle}
                </NavBar>
            </div>
        </>
    );
};
const styleInject = (): void => {
    const css =
        '.am-tab-bar {\n  padding-bottom:var(--alita-safe-area-bottom);\n} html{--alita-safe-area-top: env(safe-area-inset-top);--alita-safe-area-bottom: env(safe-area-inset-bottom);--alita-safe-area-left: env(safe-area-inset-left);--alita-safe-area-right: env(safe-area-inset-right);}';
    if (typeof document === 'undefined') {
        return;
    }

    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style') as any;
    style.type = 'text/css';
    head.appendChild(style);
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
};
// styleInject();

const AlitaLayout: FC<AlitaLayoutProps> = ({
    tabBar = {},
    documentTitle,
    titleList = [],
    navBar = [],
    hideNavBar = false,
    children
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const {
        list = [],
        color,
        selectedColor,
        backgroungColor = '#FFF',
        backgroundColor,
        position,
        tabsGroup = [],
    } = tabBar as TabBarProps;
    const { navList } = navBar;
    let pageNavBar = null;
    if (navList) {
        pageNavBar = checkNavBarList(pathname, navList);
    }
    const realNavBar = {
        ...navBar,
        ...pageNavBar,
    };
    const { pageBackground } = realNavBar;
    const { hasTabsBar, pageTitle, realList } = checkTabsList(
        pathname,
        list,
        tabsGroup,
    );
    const isTabsApp = list.length > 0;
    const titleListItem = checkTitleList(pathname, titleList);
    const realTitle = realNavBar?.pageTitle || titleListItem || pageTitle || documentTitle || '';

    // 头部永久固定，部分页面需要跟随页面流滚动，可以选择隐藏 NavBar，在页面中手动添加
    const headFixed = realNavBar.fixed;
    if (headFixed) {
        console.warn(
            'navbar fixed 设置已被移除，请通过在页面中手动添加的方式实现。有疑问请联系微信yu_xiaohu',
        );
    }
    useDocumentTitle(realTitle);
    //
    return (
        <div
            className="alita-page"
            style={ { background: pageBackground || '#FFF' } }
        >
            {!hideNavBar &&
                headerRender({
                    hasTabsBar,
                    realNavBar,
                    realTitle,
                    navigate,
                })}
            <div
                className="alita-content alita-layout-content"
            >
                {children}
            </div>
            {isTabsApp && hasTabsBar && (
                <div className="alita-layout-footer alita-footer">
                    <TabBar
                        tabBarPosition={position}
                        unselectedTintColor={color}
                        tintColor={selectedColor}
                        barTintColor={backgroundColor || backgroungColor}
                        style={ { backgroundColor:backgroundColor || backgroungColor, '--adm-color-primary': selectedColor, '--adm-color-text-secondary': color}}
                        safeArea={true}
                        activeKey={pathname}
                        onChange={value => {
                            const item = realList.filter(i => i.pagePath === value)[0];
                            if (!item) return;
                            if (item.onPress) {
                                item.onPress();
                            } else {
                                navigate(item.pagePath);
                            }
                        }}
                    >
                        {realList.map(item => {

                            return (
                                <TabBar.Item
                                    title={item.text}
                                    icon={
                                        item?.icon || ((active) => (
                                            <div
                                                style={ {
                                                    display: item?.iconPath ? 'block' : 'none',
                                                    width: `${item.iconSize || '0.38rem'}`,
                                                    height: `${item.iconSize || '0.38rem'}`,
                                                    background: `url(${!active ? item.iconPath : item?.selectedIconPath
                                                        }) center center /  ${item.iconSize ||
                                                        '0.38rem'} ${item.iconSize || '0.38rem'} no-repeat`,
                                                } }
                                            />
                                        ))
                                    }
                                    badge={item.badge}
                                    key={item.pagePath}
                                ></TabBar.Item>
                            );
                        })}
                    </TabBar>
                </div>
            )}
        </div>
    );
};

interface BasicLayoutProps {
  hideNavBar: boolean;
  location: any;
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
      if (changeData[newPagePath]?.remove) return;
    }
    newNavList.push(i);
  });
  Object.keys(newChangeData).forEach((item: string) => {
    if (newChangeData[item]?.remove) return;
    newNavList.push(newChangeData[item]);
  });
  return { ...other, list: newNavList };
};

let prevPathName = '/';
const hideNavBar = {{{ isMicroApp }}};
const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const [pageNavBar, setPageNavBar] = useState({});
  const [tabBarList, setTabBarList] = useState({});
  const { children, ...otherProps } = props;
  const location = useLocation();
  // mobile layout runtime config
  const runtime = getPluginManager().applyPlugins({ key: 'mobileLayout',type: 'modify', initialValue: {} });
  const { titleList, documentTitle, navBar, tabBar, onPageChange, customHeader=null } = runtime;
  useEffect(() => {
    setPageNavBar(getPageNavBar());
    setTabBarList(getTabBarList());
    setTimeout(() => {
      onPageChange && onPageChange(request, location.pathname, prevPathName);
      prevPathName = location.pathname;
    }, 10);
  }, [location.pathname]);
  useEffect(()=>{
    layoutEmitter?.useSubscription?.((e) => {
        setPageNavBar(getPageNavBar());
        setTabBarList(getTabBarList());
      });
  },[]);
  let element = useOutlet();
{{#hasKeepAlive}}
  element = useKeepOutlets();
{{/hasKeepAlive}}
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
      {customHeader}
      {element}
    </AlitaLayout>
  );
};

export default BasicLayout;
