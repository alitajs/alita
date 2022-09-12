# 移动端布局

alita 提供了一个页面头部有导航栏，页面底部有导航标签栏的布局。其中使用到 antd-mobile 中的 `NavBar`、`TabBar`组件。

alita 会自动检测项目中安装的 antd-mobile 版本，自动切换到 `antd-mobile@2.3.4` 或者 `antd-mobile@^5`。

## 开启

在 `config/config.ts` 中配置 `mobileLayout:true` 开启。


```ts
import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  mobileLayout: true,
});
```

### 1、通用配置

正常我们会在 `app.ts` 文件下通过 `mobileLayout` 的配置来实现。

```js
// 这里用来设置 navbar
// 通过这里的配置就可以看到 首页隐藏了导航栏
// 而list 会显示导航栏
const navList: NavBarListItem[] = [
  {
    pagePath: '/',
    navBar: {
      hideNavBar: true,
    },
  },
  {
    pagePath: '/list',
    navBar: {},
  },
];

// 设置标题
const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '',
  },
  {
    pagePath: '/list',
    title: '列表',
  },
];
// 这里是配置 tabBar 的如果没用到可以设置 list 为空
const tabBar: TabBarProps = {
  color: '#696D6C',
  selectedColor: '#3562AD',
  borderStyle: 'white',
  position: 'bottom',
  list: [],
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar: {},
  titleList,
};
```

通过上面的代码可得知 `navList` 用来配置 `navbar`。

**当用户每新创建一个页面就需要来 `navList` 进行配置。**

若用户未配置，则默认展示 `navbar` 并且标题为 `默认标题`。

[alita 官网](https://alitajs.com/components/alita-layout#navbar-%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E) 这里就显示了 `navBar` 下的所有可配置属性。如 `rightContent`。

### 2、自定义配置

当用户需要根据某些场景动态的修改导航栏上的标题，或者是左侧右侧的图标以及点击事件时。可以在该页面做如下操作：

```js
import React, { useEffect } from 'react';
import { setPageNavBar } from 'alita';

const Page = ({ location }) => {
  const a = 0;
  useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        pageTitle: '自定义名称',
        title: '自定义名称',
        onLeftClick: () => <div>自定义内容</div>,
      },
    });
  }, [a]);
};

export default Page;
```

当 `a` 发生变动时，会触发 `setPageNavBar` 实现导航栏的动态修改。

## API

### 所有参数说明

| 属性          | 类型            | 必填 | 默认值 | 描述                                   |
| ------------- | --------------- | ---- | ------ | -------------------------------------- |
| tabBar        | TabBarProps     | 否   | 无     | 定义页面切换页信息，api 参考微信小程序 |
| documentTitle | string          | 否   | 无     | 定义项目的默认 title                   |
| titleList     | TitleListItem[] | 否   | 无     | 定义所有页面的 title                   |
| navBar        | NavBarProps     | 否   | 无     | 定义头部导航信息                       |

### tabBar 参数说明

| 属性            | 类型       | 必填 | 默认值 | 描述                                                     |
| --------------- | ---------- | ---- | ------ | -------------------------------------------------------- |
| color           | HexColor   | 是   |        | tab 上的文字默认颜色，仅支持十六进制颜色                 |
| selectedColor   | HexColor   | 是   |        | tab 上的文字选中时的颜色，仅支持十六进制颜色             |
| backgroundColor | HexColor   | 是   |        | tab 的背景色，仅支持十六进制颜色                         |
| list            | Array      | 是   |        | tab 的列表，详见 list 属性说明，最少 2 个、最多 5 个 tab |
| position        | string     | 否   | bottom | tabBar 的位置，仅支持 bottom / top                       |
| tabsGroup       | string[][] | 否   |        | 当一个项目需要多个 TabBar 时配置                         |

> tabsGroup 仅仅标记 tab 分组，是否是 tab 页面，和其他参数依旧在 list 中配置

比如有四个页面是 tab 页面，你先不管他们如何分组，全部按照 list 的配置，写到 list 里

```ts
const tabList: TabBarListItem[] = [
  {
    pagePath: '/',
    title: '首页',
    ...
  },
  {
    pagePath: '/list',
    title: '列表',
    ...
  },
  {
    pagePath: '/settings',
    title: '设置',
    ...
  },
  {
    pagePath: '/show',
    title: '展示',
    ...
  },
];
```

然后再将他们进行分组，比如将首页和列表分为一组，当访问首页的时候，底部 TabBar 会有首页和列表两个切换项。

```ts
const tabBar: TarBarProp
  list: tabList,
  tabsGroup: [['/','/list'],['/setting','/show']]
};
```

### list 参数说明

| 属性             | 类型      | 必填 | 说明                                                   |
| ---------------- | --------- | ---- | ------------------------------------------------------ |
| pagePath         | string    | 是   | 页面路径，必须在 pages 中先定义                        |
| text             | string    | 否   | tab 上按钮文字                                         |
| iconPath         | string    | 否   | 图片路径，当 position 为 top 时，不显示 icon。         |
| selectedIconPath | string    | 否   | 选中时的图片路径，当 position 为 top 时，不显示 icon。 |
| iconSize         | string    | 否   | 0.44rem                                                |
| badge            | string    | 否   | badge                                                  |
| onPress          | function  | 否   | 点击事件                                               |
| title            | string    | 否   | 定义页面标题                                           |
| icon             | ReactNode | 否   | 自定义 tab 样式                                        |
| selectedIcon     | ReactNode | 否   | 自定义选中 tab 样式                                    |

> 关于页面标题，声明权重如下：
> titleList > list.title > list.text > documentTitle > ''

### navBar 参数说明

| 属性           | 说明                       | 类型              | 默认值                                    |
| -------------- | -------------------------- | ----------------- | ----------------------------------------- |
| mode           | 模式                       | string            | 'dark' enum{'dark', 'light'}              |
| icon           | 出现在最左边的图标占位符   | ReactNode         | 不在 tabsBar 的页面，会有默认左侧回退图标 |
| leftContent    | 导航左边内容               | any               | 无                                        |
| rightContent   | 导航右边内容               | any               | 无                                        |
| onLeftClick    | 导航左边点击回调           | (e: Object): void | 有左侧回退图标的默认事件是返回上一页      |
| navList        | 单独设置某些页面的 navbar  | NarBarListItem    | 无                                        |
| hideNavBar     | 隐藏 NavBar，默认有 NarBar | boolean           | false                                     |
| fixed          | NavBar 固定在页面头部      | boolean           | false                                     |
| pageBackground | 页面的背景颜色             | string            | '#FFF'                                    |
| pageTitle      | 页面标题                   | string            | 无，优先级最高                            |

### navList 参数说明

| 属性     | 说明              | 类型        | 默认值 |
| -------- | ----------------- | ----------- | ------ |
| pagePath | 路由名称          | string      | 无     |
| navBar   | 当前路由的 navBar | NavBarProps | 无     |
