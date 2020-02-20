# @umijs/plugin-hd

Hd plugin for umi.

## Usage

```js
// .umirc.ts
export default {
  plugins: ['@umijs/plugin-hd'],
  hd: true,
};
```

`hd` more options:

```js
{
  // same as config.theme, default set @hd: 2px
  "theme": {},
  "px2rem": {
    "rootValue": 100,
    "unitPrecision": 5,
    "propWhiteList": [],
    "propBlackList": [],
    "exclude": false,
    "selectorBlackList": [],
    "ignoreIdentifier": false,
    "replace": true,
    "mediaQuery": false,
    "minPixelValue": 0
  }
}
```
