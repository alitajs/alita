# Alita
<a href="https://alitajs.com"><img src="https://img.shields.io/badge/alitajs-alita-blue.svg" alt="alita" /></a>

我们将为你提供技术指导与技术支持，使umi更适用于你们内部业务，这一切都是免费的。

请告诉我们你的需求[alita/Issues](https://github.com/alitajs/alita/issues) 、[umi/Issues](https://github.com/umijs/umi/issues) 、 [ant-design-pro/Issues](https://github.com/ant-design/ant-design-pro/issues)

alita是一个社区组织，请把这个徽章添加到你的项目的README.md来支持alita

```html
<a href="https://alitajs.com"><img src="https://img.shields.io/badge/alitajs-alita-blue.svg" alt="alita" /></a>
```

或者在markdown中使用

```markdown
[![Alita](https://img.shields.io/badge/alitajs-alita-blue.svg)](alitajs.com)
```

![2019-04-10 11 37 33](https://user-images.githubusercontent.com/11746742/55874614-75875880-5bc5-11e9-8890-9d10c7f46ca9.gif)

## [Future](https://github.com/alitajs/alita/issues/1)
|产品|项目|备注|
|  :-:  | :-:  |:-:  |
|web-components| https://github.com/alitajs/components||
|blocks||充分用上抽象语法树 https://github.com/angular/angular-cli 感觉可以归到umi ui里面|
|alitax||https://github.com/refect/refect|
|kiwi|https://github.com/alitajs/umi-plugin-kiwi|https://github.com/alibaba/kiwi|
|ice||https://github.com/alibaba/ice/|
|landing||可视化编辑页面 https://github.com/ant-design/ant-design-landing|
|static mock|| 将mock数据解析成静态json，去掉参数，保留正确响应。使得 umi build 之后，不需要部署服务器就可以预览页面，用于项目演示|

## 现有配置项 `umi` ， `authority` ， `menu` 。

### umi
umi 之前的所有配置都保留在这个配置项，有需要的时候可以使用。

### authority

默认配置：

```js
export default {
  authority: {
    authorize: [
      {
        guard: ['src/Authority'],
        include: /\//,
        exclude: /\/user/i,
      },
    ],
  },
};
```
使用 `src/Authority` 对项目做权限控制，除了url里面带有user以外的，所有的url都进行权限控制，可以通过增加配置，来自定义。

### menu 

默认配置：

```js
const path = require('path');

export default {
  menu: {
    build: path.resolve('.', './src/menus.json'),
  },
}
```
根据umi生成的路由，生成menu数据，默认生成 `src/menus.json` 。



