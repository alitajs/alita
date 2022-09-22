# 移动端布局

alita 内置 `plugin-mobile-layout` 插件提供了一个页面头部有导航栏，页面底部有导航标签栏的布局。其中使用到 antd-mobile 中的 `NavBar`、`TabBar`组件。

还会自动检测项目中安装的 antd-mobile 版本，自动切换到 `antd-mobile@2.3.4` 或者 `antd-mobile@^5`。

## 配置

在 `config/config.ts` 中配置 `mobileLayout:'mobile5'` 开启，并设置 antd-mobile 版本。


```ts
import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  mobileLayout: 'mobile5', // 设置 antd-mobile 版本
});
```

## 运行时的配置

可以在 `src/app.ts` 中配置页面底部导航标签栏、所有页面的默认 title、页面的 title、页面头部导航栏。

通过 export `mobileLayout` 对象将作为配置传递给 alita 移动端布局组件，如下所示：

```ts
export const mobileLayout = {
  tabBar,
  navBar,
  documentTitle: '默认标题',
  titleList,
};
```

| 属性          | 类型            | 必填 |  描述                                   |
| ------------- | --------------- | ---- |  -------------------------------------- |
| tabBar        | TabBarProps     | 否   |  定义页面底部导航标签栏                   |
| navBar        | NavBarProps     | 否   |  定义页面头部导航栏                        |
| documentTitle | string          | 否   |  定义所有页面的默认标题                     |
| titleList     | TitleListItem[] | 否   |  定义页面的标题                    |


### 定义页面底部导航标签栏

`tabBar` 的类型 `TabBarProps` 定义如下： 

| 属性            | 类型       | 必填 | 描述|
| --------------- | ---------- | ---- | -------------------------------------------------------- |
| color           | HexColor   | 是    | 导航标签的文字默认颜色，仅支持十六进制颜色                 |
| selectedColor   | HexColor   | 是    |导航标签的文字选中时的颜色，仅支持十六进制颜色             |
| backgroundColor | HexColor   | 是    |导航标签的背景色，仅支持十六进制颜色                         |
| list            | TabBarListItem[] | 是    |导航标签的列表，最少 2 个、最多 5 个 tab |
| tabsGroup       | string[][] | 否    | 当需要多套 tabBar 时配置                         |

`tabBar.list` 的类型 `TabBarListItem` 定义如下： 

| 属性             | 类型      | 必填 | 说明                                                   |
| ---------------- | --------- | ---- | ------------------------------------------------------ |
| pagePath         | string    | 是   | 页面路径，必须在 pages 中先定义                        |
| text             | string    | 否   | 导航标签的文字                                         |
| iconPath         | string    | 否   | 导航标签图标路径|
| selectedIconPath | string    | 否   | 导航标签选中时的图标路径|
| iconSize         | string    | 否   | 0.44rem、20px                                          |
| badge            | string    | 否   | 导航标签图标右上角显示数值 （微标数）  |
| onPress          | function  | 否   | 导航标签点击回调                                    |
| title            | string    | 否   | 页面标题                                           |
| icon             | ReactNode | 否   | 自定义导航标签                                        |
| selectedIcon     | ReactNode | 否   | 自定义选中的导航标签                                    |


示例：

```ts
import { history } from 'alita';
import type { TabBarProps, TabBarListItem } from 'alita';
import { AppstoreOutline, FileOutline } from 'antd-mobile-icons';

const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    text: '首页',
    icon:<AppstoreOutline />,
    selectedIcon:<AppstoreOutline />,
    iconSize: '20px',
    title: '首页',
    onPress: () =>{
      history.replace('/');
    }
  },
  {
    pagePath: '/list',
    text: '待办',
    icon: <FileOutline />,
    selectedIcon:<FileOutline />,
    iconSize: '20px',
    title: '待办中心',
    badge: '3',
    onPress: () = {
      history.replace('/list')
    }
  },
] 

const tabBar: TabBarProps = {
  color: `#000000`,
  selectedColor: '#00A0FF',
  backgroungColor:'#Fff',
  list: tabList,
  tabsGroup:[['/','/list'],['/new','/ad']]
};

export const mobileLayout = {
  tabBar,
};
```
### 定义页面头部导航栏

`navBar` 的类型 `NavBarProps` 定义如下： 

| 属性           | 说明                       | 类型              | 默认值                                    |
| -------------- | -------------------------- | ----------------- | ----------------------------------------- |
| mode           | 风格模式                   | string   | 'dark' enum{'dark', 'light'}              |
| icon           | 头部导航左侧，返回区域的图标 | ReactNode  | 不在 tabsBar 中定义的页面，会有默认左返回图标 |
| leftContent    | 头部导航左侧的返回区域的右侧内容| React.ReactNode |无   |
| rightContent   | 头部导航右侧内容               | React.ReactNode | 无      |
| onLeftClick    | 头部导航左侧的返回区域点击回调 | (navigate) => void | 有左侧回退图标的默认事件是返回上一页|
| navList        | 单独设置某些页面的 navbar  | NarBarListItem    | 无                                        |
| hideNavBar     | 隐藏 NavBar，默认有 NarBar | boolean           | false                                     |
| pageBackground | 页面的背景颜色             | string            | '#FFF'                                    |
| pageTitle      | 页面标题                   | string            | 无，优先级最高                            |

`navList` 的类型 `NarBarListItem` 定义如下：

| 属性     | 类型        | 默认值 | 说明              |
| -------- | ----------------- | ----------- | ------ |
| pagePath | string      | 无     | 页面路径，必须在 pages 中先定义| 
| navBar   | NavBarProps| 无     |当前路由的 navBar |

示例：

```ts
import type { NavBarProps, NavBarListItem } from 'alita';
import { LeftOutline } from 'antd-mobile-icons';

const navList: NavBarListItem[] = [
  {
    pagePath: '/list',
    navBar: {
      mode: 'dark',
      icon: <LeftOutline />,
      rightContent: (<div>详情</div>),
      onLeftClick: (navigate) => {
        navigate(-1);
      },
      pageBackground: '#fff',
      pageTitle: '待办中心',
    },
  },
  {
    pagePath: '/details',
    navBar: {
      hideNavBar: false,
    }
  }
];

const navBar: NavBarProps = {
  mode: 'dark',
  onLeftClick: (navigate) => {
    navigate(-1);
  },
  pageBackground: '#fff',
  pageTitle: '首页',
  navList,
};

export const mobileLayout = {
  navBar,
};
```
### 定义页面的标题

`titleList` 的类型 `TitleListItem[]` 定义如下： 

| 属性             | 类型      | 必填 | 说明                                                   |
| ---------------- | --------- | ---- | ------------------------------------------------------ |
| pagePath         | string    | 是   | 页面路径，必须在 pages 中先定义                        |
| title             | string    | 否   | 页面标题                                         |

示例：

```ts
import type { TitleListItem } from 'alita';
import { LeftOutline } from 'antd-mobile-icons';

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
];

export const mobileLayout = {
  titleList,
};
```

### 定义所有页面的默认标题

```ts
export const mobileLayout = {
  documentTitle: '默认标题',
};
```

#### 页面标题的设置优先级

`titleList` 的 `title`> `tabBar` 中 `list` 的 `title` > `documentTitle`。


## 动态配置

通过 alita 内置 `plugin-mobile-layout` 插件提供的 [`setPageNavBar`](../api/layout-api#setpagenavbar) 来配置页面头部导航栏，[`setTabBarList`](../api/layout-api#setTabBarList) 来配置页面底部导航标签栏。
