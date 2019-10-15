# umi-plugin-cache-route

[![NPM version](https://img.shields.io/npm/v/umi-plugin-cache-route.svg?style=flat)](https://npmjs.org/package/umi-plugin-cache-route)
[![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-cache-route.svg?style=flat)](https://npmjs.org/package/umi-plugin-cache-route)

umi keep alive

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-cache-route', {
      keepalive:['route path','route path']
    }],
  ],
}
```

### Configuration Routing 配置路由

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-cache-route'],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/list',
          component: './list',
          keepAlive: true,
        },
        {
          path: '/item',
          component: './item',
        },
      ],
    },
  ]
};
```

### Conventional Routing 约定式路由

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    ['umi-plugin-cache-route', {
      keepalive:['/list']
    }],
  ],
}
```

### Manual release 手动解除keep

```js
import { dropByCacheKey } from 'umi';

export default () => {
  const clearCache = () => {
    dropByCacheKey('/list');
  };
  return (
    <Card>
      <Button onClick={clearCache}>clear list page cache</Button>
    </Card>
  );
};

```

## Options

TODO

## LICENSE

MIT
