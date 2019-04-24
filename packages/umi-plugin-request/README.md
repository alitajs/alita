# umi-plugin-request

[![NPM version](https://img.shields.io/npm/v/umi-plugin-request.svg?style=flat)](https://npmjs.org/package/umi-plugin-request)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-request.svg?style=flat)](https://npmjs.org/package/umi-plugin-request)

umi-request

## Usage

use plugin in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-request'],
  ],
}
```

config umi-request in `src/app.j|ts`

```js
export const request = {
  prefix: 'abc1'
};
```

use in pages

```js
import request from 'alita-request';
request('/api/user');
```

## Options

TODO

## LICENSE

MIT
