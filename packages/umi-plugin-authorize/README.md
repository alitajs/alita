# umi-plugin-authorize

[![NPM version](https://img.shields.io/npm/v/umi-plugin-authorize.svg?style=flat)](https://npmjs.org/package/umi-plugin-authorize)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-authorize.svg?style=flat)](https://npmjs.org/package/umi-plugin-authorize)

configure authorize

create by [create-umi](https://github.com/umijs/create-umi)
## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-authorize', options],
  ],
}
```

## Options
```js
authorize: [
  {
    guard: ["./routes/PrivateRoute.js"],
    exclude: "scroll-to-top/a"
  },
  {
    guard: ["./routes/PrivateRoute.js"],
    include: /\/list/
  },
  {
    include: "scroll-to-top",
    exclude: "scroll-to-top/a"
  },
  {
    guard: ["./routes/PrivateRoute.js"],
    include: "scroll-to-top",
    exclude: "scroll-to-top/a"
  }
];
```
authorize必须是一个数组

guard必须是一个数组

include和exclude的值为正则表达式或者字符串

include表示：包含这个字符串或者满足这个正则会被添加

exclude表示：包含这个字符串或者满足这个正则会被忽略

include不存在，则当前设置无效，如上述第一条

exclude不存在，则当前不忽略，如上诉第二条

guard不存在，则当前设置无效，如上述第三条

## LICENSE

MIT
