# 运行时配置

## 一、如何配置

插件的配置分为编译时的和运行时的，编译时的配置是在 node 端执行，运行时的配置是在浏览器端执行。

运行时的配置的值有很多类型，可以为数组、对象、函数等等，而且配置只有注册了才能使用。

约定在 src/app.ts|tsx 文件中使用插件运行时的配置，这些配置需通过 `export` 导出，插件中才能读取到。

可以 import 一些依赖来完成某些配置，但是只能 import 浏览器端依赖，不能引入 node 依赖，否则会陷入死循环。同时要切记所 import 依赖只能跟配置相关，如果要引起全局依赖，请在 src/global.ts 文件中引入。

alita 内置了多个插件，这些插件注册了一些运行时的配置。

## 二、配置项

### render

在页面渲染前做点事情

比如用于渲染之前做权限校验，

```bash
import { history } from 'umi';

export function render(oldRender) {
  fetch('/api/auth').then(auth => {
    if (auth.isLogin) { 
      oldRender() 
    }else {
      history.push('/login');
      oldRender()
    }
  });
}
```

### onRouteChange

```js
export function onRouteChange({ routes, clientRoutes, location, action }) {
    
}
```
用来监听路由的变化。

- `routes`: 路由map数据，其中key为路由id
- `clientRoutes`：层级化路由数据
- `action`：路由动作 `push`、`pop`、`replace`；
- `location`：对 window.location 进行包装后，提供了一个形式简洁的Location对象，其中`location.state`是隐式传参的参数


### patchRoutes

```js
export function patchRoutes({ routes, routeComponents }) {
  routes['list/index'].path = '/toDoList'
}
```

- `routes`: 路由对应的 path 映射 Map ，其 key 为路由ID；
- `routeComponents`：路由对应的组件映射 Map，其 key 为路由ID。

通过直接修改 `routes` 或 `routeComponents`，来追加或修改路由，不需要返回。

> 如需动态更新路由，建议使用 patchClientRoutes() ，否则你可能需要同时修改 routes 和 routeComponents。

### patchClientRoutes

通过直接修改 `routes`，动态更新路由，不需要返回。

比如在最前面添加一个 `/foo` 路由，

```js
import Foo from '@/extraRoutes/foo';

export function patchClientRoutes({ routes }) {
  routes.unshift({
    path: '/foo',
    exact: true,
    element: <Foo/>
  });
}
```

再比如和 `render` 配置配合使用，请求服务端根据响应动态更新路由，

```js
let extraRoutes;

export function patchRoutes({ routes }) {
  merge(routes, extraRoutes);
}

export function render(oldRender) {
  fetch('/api/routes').then(res=>res.json()).then((res) => {
    extraRoutes = res.routes;
    oldRender();
  })
}
```

### rootContainer

修改、包装渲染时的根组件。

比如给上一次渲染时的根组件包一个 Provider，`container` 为上一次渲染时的根组件。

```js
import {ThemeContext} from '@/components/Theme';
const ThemeProvider = ({ children, value }: any) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
export function rootContainer(container: any) {
  return React.createElement(ThemeProvider, { value:{color: 'red'} }, container);
}
```

## 三、更多配置

Alita 也允许第三方插件注册运行时的配置，如何注册可以阅读[插件开发]。

如果你使用插件，肯定会在插件里找到更多运行时的配置项。
