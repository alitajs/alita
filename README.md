# Alita

我们将为你提供技术指导与技术支持，使umi更适用于你们内部业务，这一切都是免费的。

请告诉我们你的需求[alita/Issues](https://github.com/alitajs/alita/issues) 、[umi/Issues](https://github.com/umijs/umi/issues) 、 [ant-design-pro/Issues](https://github.com/ant-design/ant-design-pro/issues)

![2019-04-10 11 37 33](https://user-images.githubusercontent.com/11746742/55874614-75875880-5bc5-11e9-8890-9d10c7f46ca9.gif)

## Future
|产品|项目|
|  :-:  | :-:  |
|web-components| https://github.com/alitajs/components|
|blocks||
|alitax||
|kiwi||
|ice||

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



