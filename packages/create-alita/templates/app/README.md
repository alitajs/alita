<h1 align="center">Alita Pro</h1>

帮助你快速使用 alita

```
pnpm i
pnpm start
```

### 首页

![image](https://user-images.githubusercontent.com/11746742/179654827-2ca22b45-0ec9-471e-8238-9bfa56d864a0.png)

### 列表页

列表页支持滚动加载更多，固定头部，状态保持

![image](https://user-images.githubusercontent.com/11746742/179654907-585061f1-02cc-464e-ac75-c6ae12b2c666.png)


### 关于尺寸标注

100% 宽为 750px，可在蓝湖等工具中将标准改为 750px，这样可以直接使用标注的尺寸用于 caa class 中的尺寸，最终运行会根据手机适配，将 px 自动转为对应的 rem 值。

值得注意的是，写在内联样式 style 中的 px 值不会被转化，需要手动写明 rem 单位，直接将 px 值除于 100 即可，如 750px，在 style 中应该写为 7.5rem

### 关于路由

采用约定式路由，只有 `src/pages/**/index.tsx` 会被识别成路由，可使用 npx alita g pages name 来新增页面。

> Q: 为什么仅 index.tsx 会被识别成路由？如果我想要嵌套的路由，如 hello/hero 我该怎么办？
> A: 仅 index.tsx 被识别成路由，会让整个文件结构变得很干净，在移动端上不需要嵌套路由，一般短位链接优势更大

### 自带头部

可在 `src/app.tsx#L24` 中配置

```tsx
const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/list',
    title: '列表',
  },
];
```

也可以在页面中独立配置

```tsx
import { setPageNavBar, useLocation } from 'alita';
import { LeftOutline } from 'antd-mobile-icons';
import { useEffect } from 'react';

const location = useLocation();
useEffect(() => {
  setPageNavBar({
    pagePath: location.pathname,
    navBar: {
      mode: 'dark',
      pageTitle: '首页动态标题',
      pageBackground: '#fff',
      back: '返回',
      icon: <LeftOutline />,
      leftContent: <div>首页</div>,
      rightContent: <div>详情</div>,
      onLeftClick: (navigate) => {
        navigate(-1);
      },
      hideNavBar: false,
    },
  });
}, []);
```

> 关闭默认 NavBar 上述 hideNavBar 配置改为 hideNavBar: true

### 底部 Tabs

可在 `src/app.tsx#L42` 中配置

```tsx
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
    pagePath: '/list',
    text: '列表',
    iconPath: ListGary,
    selectedIconPath: ListBlue,
    title: '列表',
    iconSize: '',
    badge: '',
  },
];
```

也可以在页面中独立配置

```tsx
import { setTabBarList, useLocation } from 'alita';
import { useEffect } from 'react';

const location = useLocation();
useEffect(() => {
  setTabBarList({
    pagePath: location.pathname,
    text: '首页',
    iconSize: '18px',
    badge: '12',
    onPress: () => {
      navigate(location.pathname, { replace: true });
      return '';
    },
    remove: false,
  });
}, []);
```

> 关闭 app.ts 中已经配置好的 Tab ，上述 remove 配置改为 remove: true

### 格式化

```
pnpm format
```

### 构建

```
pnpm build
```

### 调试工具

在 `config/config.ts` 中增加配置

```
aconsole: {
    console: {},
    inspx: {},
},
```