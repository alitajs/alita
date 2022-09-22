# 路由API

## history

用于获取当前路由信息、执行路由跳转、监听路由变更等操作。

类型：

```ts
declare type To = string | Partial<Path>;

interface Update {
  action: Action;
  location: Location;
}
interface Listener {
  (update: Update): void;
}

interface History{
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string;
  push(to: To, state?: any): void;
  replace(to: To, state?: any): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: Listener): () => void;
  block(blocker: Blocker): () => void;
}
```

示例：

获取当前路由信息：

```ts
import { history } from 'alita';

// 当前 history 跳转的 action，有 PUSH、REPLACE 和 POP 三种类型
history.action;

// location 对象，包含 pathname、search 和 hash
history.location.pathname;
history.location.search;
history.location.hash;
```

命令式路由跳转：

```ts
import React from 'react';
import { history } from 'alita';
import type {FC} from 'react';

const App: FC = () =>{
  const toFoo = () =>{
    // 跳转到指定路由
    history.push('/list');

    // 带参数跳转到指定路由
    history.push('/foo?type=1');
    history.push({
      type: 1,
    });

    // 替换掉history栈当前地址为要跳转的地址
    history.replace('/foo?type=1');

    // 跳转到上一个路由
    history.back();
    history.go(-1);

    // 跳转到下一个路由
    history.forward();
    history.go(1);
  }

  return <div onClick={toFoo}>hello alita</div>
}

export default App;
```

路由监听：

```ts
import React from 'react';
import { history } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const unlisten = history.listen((location: any, action: any) => {
    console.log(location.pathname);
    console.log(action)
  });
  unlisten();

  return <div>hello alita</div>
}

export default App;
```

创建 `<a>` 标签的 `href`

```ts
import React from 'react';
import { history } from 'alita';
import type { FC } from 'react';

const App: FC = () =>{
  return (
    <a href={history.createHref('/list?type=1')}>hello alita</a>
  )
}

export default App;
```

## useOutletContext

`useOutletContext` 用于返回 `Outlet` 组件上挂载的 `context` 。

类型定义如下：

```ts
declare function useOutletContext<Context = unknown>(): Context;
```

示例：

```ts
import React from 'react';
import { useOutletContext, Outlet } from 'alita';
import type { FC } from 'react';
 
const Layout: FC = () => {
  return (
    <div className="fancyLayout">
      <Outlet context={{ prop: 'from Layout'}} />
    </div>
  )
}

export default Layout;
```

```ts
import React from 'react';
import { history } from 'alita';
import type { FC } from 'react';

const App: FC = () =>{
  const layoutContext = useOutletContext();
  console.log(layoutContext)// {"prop":"from Layout"}

  return <div>hello alita</div>
}

export default App;
```
## useOutlet

`useOutlet` 返回当前匹配的子路由元素，`<Outlet>` 组件内部使用的就是此 hook 。

类型：

```ts
declare function useOutlet(): React.ReactElement | null;
```

示例：

```ts
import React from 'react';
import { useOutlet } from 'alita';
import type { FC } from 'react';
 
const Layout: FC = ()=>{
  const outlet = useOutlet()
 
  return (
    <div className="fancyLayout">
      {outlet}
    </div>
  )
}

export default Layout;
```

## useNavigate

返回一个函数用来实现编程式导航，代替useHistory。

类型：

```ts
declare function useNavigate(): NavigateFunction;
 
interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: any }
  ): void;
  (delta: number): void;
}
```

示例：

路由跳转。

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toFoo = () =>{
    // 在history栈里添加跳转的页面地址
    navigate('/foo');
    
    // 替换掉history栈当前地址为要跳转的地址
    navigate('/foo', {replace: true});
    
    // 返回前一个url
    navigate(-1);
  }

  return <div onClick={toFoo}>hello alita</div>
}

export default App;
```

隐式传参，通过`state`隐式传参，刷新页面会消失。

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toFoo = () =>{
    navigate('/foo', {
      state: {
        type: '1',
      }
    })
  }

  return <div onClick={toFoo}>hello alita</div>
}

export default App;
```

显式传参，通过`search`显式传参，有两种写法。

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  
  const toFoo = () =>{
    // 跳转后新页面的url：http://localhost:8000/#/foo?type=1
    navigate('/foo?type=1');

    navigate({
      pathname: '/foo',
      search: '?type=1',
    });
  }

  return <div onClick={toFoo}>hello alita</div>
}

export default App;

```

路径传参，需配合动态路由使用。

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toFoo = () =>{
    // 假设有路由配置  foo/:type
    navigate('/foo/1');
  }

  return <div onClick={toFoo}>hello alita</div>
}

export default App;
```

## useLocation

`useLocation` 返回当前 location 对象，可以获取`useNavigate`传参的值。

类型定义如下。

```ts
declare function useLocation(): {
  pathname: string;
  search: string;
  state: unknown;
  key: Key;
};
```

示例：

获取隐式传参的参数。

```ts
import React from 'react';
import { useLocation } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  /*
  navigate('/foo', {
    state: {
      type: '1',
    }
  })
  */
  const location = useLocation();
  console.log(location.state);// {type: '1'};

  return <div>hello alita</div>
}

export default App;
```

也可以获取显式传参的参数，不过最好是用`useSearchParams`。

```ts
import React from 'react';
import { useLocation } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  /*
  navigate({
    pathname: '/foo',
    search: '?type=1',
  });
  */
  const location = useLocation();
  console.log(location.search);// '?type=1';

  return <div>hello alita</div>
}

export default App;
```

一个场景是在 location change 时做一些 side effect 操作，比如 page view 统计。

```ts
import React, { useEffect } from 'react';
import { useLocation } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const location = useLocation();
  useEffect(() => {
    ga('send', 'pageview');
  }, [location]);

  return <div>hello alita</div>
}

export default App;

```

## useSearchParams

`useSearchParams` 用于读取和修改当前 URL 的 query string。类似 React 的 `useState`，其返回包含两个值的数组，当前 URL 的 search 参数和用于更新 search 参数的函数。

类型：

```ts
declare function useSearchParams(defaultInit?: URLSearchParamsInit): [
  URLSearchParams,
  (
    nextInit?: URLSearchParamsInit,
    navigateOpts?: : { replace?: boolean; state?: any }
  ) => void
];

type URLSearchParamsInit = 
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;
```

示例：

获取显式传参的参数。

```ts
import React from 'react';
import { useSearchParams } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const [searchParams] = useSearchParams();
  
  // 当url为 foo?type=1 时
  console.log(searchParams.get('type')) // 1

  return <div>hello alita</div>
}

export default App;

```

改变显式传参的参数。

```ts
import React, {useEffect} from 'react';
import { useSearchParams } from 'alita';
import type { FC } from 'react';

const App: FC () => {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() =>{
    setSearchParams({
      type:3
    })
  }, [] )
}

export default App;
```

## useParams

`useParams` 钩子函数返回动态路由的匹配参数键值对对象，子路由中会集成父路由的动态参数。

返回路由地址参数。

类型：

```ts
declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;
```

示例：

```ts
import React from 'react';
import { useParams } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
 
  // 假设有路由配置  user/:uId/repo/:rId
  // 当前路径       user/abc/repo/def
  const params = useParams();
  console.log(params)
  /* params
  { uId: 'abc', rId: 'def'}
  */

  return <div>hello alita</div>
}

export default App;
```

## useMatch

`useMatch` 返回传入 path 的匹配信息。

类型定义如下。

```ts
declare function useMatch(pattern: {
  path: string;
  caseSensitive?: boolean;
  end?: boolean;
} | string): {
  params: Record<string, string>;
  pathname: string;
  pattern: {
    path: string;
    caseSensitive?: boolean;
    end?: boolean;
  };
};
```
示例：

```ts
import React from 'react';
import { useMatch } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  // 页面url为 '/events/12' 时
  const match = useMatch('/events/:eventId');
  console.log(match);
  /* match
  {
    params: {eventId: '12'}
    pathname: "/events/12"
    pathnameBase: "/events/12"
    pattern: {
      path: '/events/:eventId',
      caseSensitive: false, // 是否区分大小写
      end: false
    }
  }
  */

  return <div>hello alita</div>
}

export default App;
```

## useResolvedPath

`useResolvedPath` 根据当前路径将目标地址解析出完整的路由信息。

类型；

```ts
declare function useResolvedPath(to: To): Path;
```

示例：

```ts
import React from 'react';
import { useResolvedPath } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const path = useResolvedPath('docs')
  console.log(path)
  /* path
  { pathname: '/a/new/page/docs', search: '', hash: '' }
  */

  return <div>hello alita</div>
}

export default App;
```

## useRouteData

`useRouteData` 返回当前路由的数据。

类型定义如下。

```ts
declare function useRouteData(): {
  route: Route;
};
```

注意：此处 API 可能还会调整。

示例：

```ts
import React from 'react';
import { useRouteData } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const route = useRouteData();
  console.log(route)
  /* route
  {
    route: {
      path: 'a/page',
      id: 'a/page/index',
      parentId: '@@/global-layout',
      file: 'a/page/index.tsx'
    }
  }
  */

  return <div>hello alita</div>
}

export default App;

```
## useRoutes

`useRoutes` 渲染路由的钩子函数，传入路由配置和可选参数 `location`, 即可得到渲染结果；如果没有匹配的路由，结果为 null。

类型：

```ts
declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string;
): React.ReactElement | null;
```

示例：

```ts
import React from 'react';
import { useRoutes } from 'alita';
import type { FC } from 'react';
import Dashboard from './dashboard';
import DashboardMessages from './dashboardMessages';
import DashboardTasks from './dashboardTasks';
import AboutPage from './aboutPage';

const App: FC = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "messages",
          element: <DashboardMessages />,
        },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}

export default App;
```
