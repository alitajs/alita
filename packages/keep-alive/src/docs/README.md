# @alitajs/layout

将@alitajs/alita-layout改成 umi 插件，为了能够在运行时配置。

## Usage

Install via yarn or npm.

```bash
$ yarn add @umijs/plugin-routes
```

Configure it in the `.umirc.js`.

```js
export default {
   plugins: ['@alitajs/layout'],
   mobileLayout: true
}
```

## mobileLayout

是否使用layout插件

## 运行时配置

在 src/app 中配置

与在layout中配置相同。详细配置，请阅读 [alita-layout](https://github.com/alitajs/alita-layout)

```ts
export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};

```

## 在页面中修改配置

```ts
import { setPageNavBar } from 'alita';
// pagePath 可以从 props.location.pathname 取得
useEffect(() => {
    setPageNavBar({
      pagePath: location.pathname,
      navBar: {
        onLeftClick:()=>{},
        rightContent: [
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ],
      },
    });
}, []);
// class 中使用，建议在 componentDidMount 中设置，也可以在任意地方动态设置。
```

配置参数[navBar 参数说明](https://github.com/alitajs/alita-layout#navbar-%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E)
