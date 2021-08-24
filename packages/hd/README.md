# @alitajs/hd

Hd plugin for umi.

## Usage

```js
// .umirc.ts
export default {
  plugins: ['@alitajs/hd'],
  hd: {
    px2rem: {
      selectorDoubleRemList: [/.ant-/],
    },
  },
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
    "selectorDoubleRemList": [/.ant-/],
    "ignoreIdentifier": false,
    "replace": true,
    "mediaQuery": false,
    "minPixelValue": 0
  }
}
```
