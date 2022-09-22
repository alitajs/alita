# 路由

alita 推荐约定式路由，约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。

## 基础路由

比如以下文件结构：

```
├── pages
│   ├── home
│   │   ├── index.less
│   │   └── index.tsx
│   ├── list
│   │   ├── index.less
│   │   └── index.tsx
```
会得到以下路由配置：

```js
[
  { exact: true, path: '/home', component: '@/pages/home' },
  { exact: true, path: '/list', component: '@/pages/list' },
]
```

需要注意的是，满足以下任意规则的文件不会被注册为路由，

* 以 . 或 _ 开头的文件或目录
* 以 d.ts 结尾的类型定义文件
* 以 test.ts、spec.ts、e2e.ts 结尾的测试文件（适用于 .js、.jsx 和 .tsx 文件）
* components 和 component 目录
* utils 和 util 目录
* 不是 .js、.jsx、.ts 或 .tsx 文件
* 文件内容不包含 JSX 元素

## 动态路由

约定，带 `$` 前缀的目录或文件为动态路由，其中文件名只有`$index`才有效。比如以下目录结构：

```
├── pages
│   ├── home
│   │   └── $index.tsx
```

会生成路由配置如下：

```js
[
  { path: '/home/:index', component: './pages/home/$index.js' },
];
```

动态路由可以用来配置路由的路径参数 `index`。


## 404页面

约定在 src/pages 目录下创建 404.tsx 作为404页面，当访问的路由地址不存在时，会自动显示 404 页面。只有 build 之后生效。调试的时候可以访问 `/404` 。

```
├── pages
│   └──  404.tsx
```

## 路由参数

### 路径参数

需配合动态路由使用，例如 home 路由组件所在目录结构：

```
├── pages
│   ├── home
│   │   └── $index.tsx
```
访问的路由地址为 http://localhost:8000/#/home/10124 ，其中 `10124`  就是名为 `index` 的路径参数。

除了直接在访问的路由地址上设置，还可以通过 `history` 或 `useNavigate` 跳转路由时候设置。

```ts
import React from 'react';
import { history } from 'alita';
import type {FC} from 'react';

const App: FC = () =>{
  const toHome = () =>{
    history.push('/home/10124');
  }

  return <div onClick={toHome}>hello alita</div>
}

export default App;
```

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/home/10124');
  }

  return <div onClick={toHome}>hello alita</div>
}

export default App;
```

通过 `useParams` 获取。

```ts
import React from 'react';
import { useParams } from 'alita';
import type { FC } from 'react';

const Home: FC = () => {
  const params = useParams();
  console.log('params',params)// { index: '10124'}

  return <div>Home</div>
}

export default Home;
```

### 显式参数

例如访问的路由地址为 http://localhost:8000/#/home/?type=1，其中 `1` 就是名为 `type` 的显式参数。

除了直接在访问的路由地址上设置，还可以通过 `history` 或 `useNavigate` 跳转路由时候设置。

```ts
import React from 'react';
import { history } from 'alita';
import type {FC} from 'react';

const App: FC = () =>{
  const toHome = () =>{
    history.push('/home/?type=1');
  }

  return <div onClick={toHome}>hello alita</div>
}

export default App;
```

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/home/?type=1');
  }

  return <div onClick={toHome}>hello alita</div>
}

export default App;
```

通过 `useSearchParams` 获取。

```ts
import React from 'react';
import { useSearchParams } from 'alita';
import type { FC } from 'react';

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  console.log('type',searchParams.get('type'))// { type: '1'}

  return <div>Home</div>
}

export default Home;
```

### 隐式参数

隐式参数顾名思义在访问的路由地址上看不见任何参数，如果想一个路由页面获取到路由参数只能在跳转时设置，而不能在路由地址上手动添加，可以采用隐式参数。

可以通过 `useNavigate` 跳转路由时候设置。

```ts
import React from 'react';
import { useNavigate } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate('/home', {
      state: {
        type: '1',
      }
    })
  }

  return <div onClick={toHome}>hello alita</div>
}

export default App;
```

通过 `useLocation` 获取。

```ts
import React from 'react';
import { useLocation } from 'alita';
import type { FC } from 'react';

const Home: FC = () => {
  const location = useLocation();
  console.log(location.state);// {type: '1'};

  return <div>Home</div>
}

export default Home;
```
