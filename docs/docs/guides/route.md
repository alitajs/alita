# 路由

alita 推荐约定式路由，约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由，通过目录和文件及其命名分析出路由配置。

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
│   ├── $id
│   │   └── $index.tsx
```

会生成路由配置如下：

```js
[
  { path: '/home/:index', component: './pages/home/$index.js' },
  { path: '/:id/:index', component: './pages/$id/$index.js' },
];
```

看到路由配置中的 `path`，动态路由是用来配置路由的地址参数，也叫路径参数。

通过 API `useParams` 来获取这些地址参数，示例：

```ts
import React from 'react';
import { useParams } from 'alita';
import type { FC } from 'react';

const App: FC = () => {
  // 当前路径       182/1
  const params = useParams();
  console.log(params)
  /* params
  { id: '182', index: '1'}
  */

  // 当前路径       home/1
  const params = useParams();
  console.log(params)
  /* params
  { index: '1'}
  */

  return <div>hello alita</div>
}

export default App;
```
