# 移动端布局API

src/config/config.ts中开启 `mobileLayout` 才可以使用移动端布局API。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  mobileLayout: true,
});
```

## setPageNavBar

该方法用来定义某个路由页面头部导航信息，其接受一个参数 `value: NavBarListItem`，参数定义如下：

```ts
interface NavBarListItem {
  pagePath: string;// 页面路径，必须在 pages 中先定义
  navBar: NavBarProps;// 头部导航信息
}
interface NavBarProps{
  mode?: 'dark' | 'light';// 风格模式
  className?: string;// 类名
  back?: string;// 头部导航左侧，返回区域的文字
  icon?: React.ReactNode;// 头部导航左侧，返回区域的图标
  leftContent?: React.ReactNode;// 头部导航左侧的返回区域的右侧内容
  rightContent?: React.ReactNode;// 头部导航右侧内容
  onLeftClick?: (navigate) => void;// 头部导航左边返回区域点击回调
  hideNavBar?: boolean;// 是否显示头部导航
  pageTitle?: string;// 头部导航标题
  pageBackground?: string;// 页面背景颜色
}
```

示例：

```ts
import { useEffect } from 'react';
import { useLocation, setPageNavBar} from 'alita';
import type {FC} from 'react';

const Foo: FC = (props) => {
  const location = useLocation();
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        mode:'dark',
        className:'test',
        pageTitle: '页面标题',
        pageBackground:'#fff',
        back:'返回',
        icon:<LeftOutline />,
        leftContent: <div>首页</div>,
        rightContent: <div>详情</div>,
        onLeftClick: (navigate) => {
          navigate(-1);
        },
        hideNavBar:false,
      },
    });
  }, []);

  return (
    <div>Foo</div>
  )
}

export default Foo;
```

## getPageNavBar

获取通过`setPageNavBar`定义的路由页面头部导航信息，返回一个对象，键值为路由地址，示例：

```ts
import React, { useEffect } from 'react';
import type {FC} from 'react;
import { getPageNavBar } from 'alita';
 
const Foo:FC = () => {
  useEffect(() => {
    const pageNavBar = getPageNavBar();
    console.log(pageNavBar);
  }, []);
};
 
export default Foo;
```

## setTabBarList

该方法用来设置页面底部导航标签。其接受一个参数 `value: TabBarListItem | TabBarListItem[]`，参数定义如下：

```ts
interface TabBarListItem {
  pagePath: string;// 页面路径，必须在 pages 中先定义
  text?: string;// 导航标签文字
  iconSize?: string;// 导航标签图标大小
  badge?: string;// 导航标签图标微标（上标）
  iconPath?: string;// 导航标签图标路径
  selectedIconPath?: string;// 选中时的导航标签图标路径
  onPress?: () => void;// 导航标签点击回调
  title?: string;// 页面标题
  remove?: boolean;// 删除对应的导航标签
  replace?: string;// 将原先已有导航标签的地址替换
}
```
示例：

```ts
import { useEffect } from 'react';
import { useLocation, setTabBarList} from 'alita';
import type {FC} from 'react';

const Foo: FC = (props) => {
  const location = useLocation();
  useEffect(() => {
    setTabBarList({
      pagePath: location.pathname,
      text: '待办',
      iconSize: '18px',
      badge: '12',
      iconPath: 'https://img1.baidu.com/it/u=1925990514,1559798685&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      selectedIconPath: 'https://img1.baidu.com/it/u=2153806047,300205282&fm=253&fmt=auto&app=138&f=JPEG?w=200&h=200',
      onPress: () => {
        navigate(location.pathname, {replace: true});
        return '';
      },
      title: '待办页面',
      remove: false,
      // replace:'/list'
    })
  }, []);

  return (
    <div>Foo</div>
  )
}

export default Foo;
```

## getTabBarList

获取通过`getTabBarList`定义的路由页面头部导航信息，返回一个对象，键值为路由地址，示例：

```ts
import React, { useEffect } from 'react';
import type {FC} from 'react;
import { getTabBarList } from 'alita';
 
const Foo:FC = () => {
  useEffect(() => {
    const tabBarList = getTabBarList();
    console.log(tabBarList);
  }, []);
};
 
export default Foo;
```
