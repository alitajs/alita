# @alitajs/routes

routes modification plugin for umi.

## Usage

Install via yarn or npm.

```bash
$ yarn add @umijs/plugin-routes
```

Configure it in the `.umirc.js`.

```js
export default {
   plugins: ['@umijs/plugin-routes'],
   routesExtend: {
     exclude: [],
     update:(routes) => {
        return routes；
     }
   }
}
```

## routesExtend

### routesExtend.exclude

type: `Array(RegExp|Function)`

e.g.

```js
{
  exclude: [
    // exclude all the `models` directory
    /models\//,
    // exclude ./pages/a.js
    (route) { return route.component === './pages/a.js' },
  ],
}
```

### routesExtend.update

type: `Function`

e.g.

```
{
  update(routes) {
    return [
      { path: '/foo', component: './bar.js' },
      ...routes,
    ];
  }
}
```
