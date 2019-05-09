---
sidebarDepth: 3
---

# FAQ

## General

### 如何动态修改 title ？

可以通过 [react-helmet](https://github.com/nfl/react-helmet) 动态修改 title 。
> 注意：在混合应用中，ios端web容器内，使用react-helmet失效的话，可以尝试使用[react-document-title](https://github.com/gaearon/react-document-title)。

## 报错

### `Object.values` is not a function

e.g.

<img src="https://gw.alipayobjects.com/zos/rmsportal/mTaaEfxKkkGAQicDOSeb.png" />

升级 node 版本，并确保版本是 8.10 或以上。

### `exports is not defined`

e.g.

<img src="https://gw.alipayobjects.com/zos/rmsportal/fLNyyPNyquAGoYQxxIDI.png" />

检查 babel 配置，删除不必要的 preset 和 plugin 。

### `Plugin umi-plugin-react:pwa initialize failed`

e.g.

<img src="https://gw.alipayobjects.com/zos/rmsportal/lSuOXlbtrZPLoMaLBODj.png" />

确保有 package.json 并配置 `name` 属性。

### `Conflicting order between [mini-css-extract-plugin]`

e.g.

<img src="https://gw.alipayobjects.com/zos/rmsportal/mjzdexbrmZulkjCAqzPC.png" />

这是 [webpack 插件的问题](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250)，不会影响 CSS 文件的正常生产，可暂时忽略。

### `umi` 不是内部或外部命令

e.g.

<img src="https://gw.alipayobjects.com/zos/rmsportal/fatmbcGwSOwDntHjmrtG.png" />

需配置 NODE_PATH 环境变量，如使用 yarn，可通过执行 `yarn global bin` 拿到 bin 路径。


## CSS

### 为啥我 import 的 css 文件不生效？

umi 默认是开启 css modules 的，请按照 css modules 的方式进行书写。

参考：

* [css-modules/css-modules](https://github.com/css-modules/css-modules)
* [CSS Modules 用法教程](http://www.ruanyifeng.com/blog/2016/06/css_modules.html)

## 部署

### build 后访问路由刷新后 404？

几个方案供选择：

* 改用 hashHistory，在 `.umirc.js` 里配 `history: 'hash'`
* 静态化，在 `.umirc.js` 里配 `exportStatic: true`
* 服务端配置路由 fallback 到 index.html

### build之后图片丢失？

可能是图片没有正确引用，可以参考一下代码，正确引入图片。

```js
import React from 'react';
import logo from './logo.png'; // 告诉WebPACK这个JS文件使用这个图像

console.log(logo); // logo.84287d09.png

function Header() {
  // 导入图片
  return <img src={logo} alt="Logo" />;
}

export default Header;

```
在css中使用，注意不要使用绝对路径
```css
.Logo {
  background-image: url(./logo.png);
}
```

> 注意：图片大小小于 10 k 时会走 base64。即不会被拷贝到 public 文件夹下，而是以 base64 的资源存在。


## 部署 html 到非根目录

经常有同学问这个问题：

> 为什么我本地开发是好的，部署后就没反应了，而且没有报错？

**没有报错！** 这是应用部署在非根路径的典型现象。为啥会有这个问题？因为路由没有匹配上，比如你把应用部署在 `/xxx/` 下，然后访问 `/xxx/hello`，而代码里匹配的是 `/hello`，那就匹配不上了，而又没有定义 fallback 的路由，比如 404，那就会显示空白页。

怎么解决？

可通过配置 [base](/zh/config/#base) 解决。

```bash
export default {
  base: '/path/to/your/app/root',
};
```

### url 变化了，但页面组件不刷新，是什么原因？

`layouts/index.js` 里如果用了 connect 传数据，需要用 `umi/withRouter` 高阶一下。

```js
import withRouter from 'umi/withRouter';

export default withRouter(connect(mapStateToProps)(LayoutComponent));
```

### 如何访问到 store 或 dispatch 方法？

```js
window.g_app._store
window.g_app._store.dispatch
```

### 全局 layout 使用 connect 后路由切换后没有刷新？

需用 withRouter 包一下导出的 react 组件，注意顺序。

```js
import withRouter from 'umi/withRouter';
export default withRouter(connect()(Layout));
```
