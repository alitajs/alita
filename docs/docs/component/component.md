# 内置组件

## 路由相关

### Outlet

`<Outlet>` 用于在父路由中渲染子路由。如果父路由被严格匹配，会渲染子路由中的 index 路由（如有）。

类型定义如下：

```ts
interface OutletProps {
  context?: unknown;
}
declare function Outlet(
  props: OutletProps
): React.ReactElement | null;
```

示例：

```ts
import { Outlet } from 'alita';
 
function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet />
    </div>
  );
}
 
function DashboardWithContext() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet context={{ prop: 'a' }}/>
    </div>
  );
}
```
`Outlet` 组件的 `context` 可以使用 API `useOutletContext` 在子组件中获取。

### Link

`<Link>` 是 React 组件，是带路由跳转功能的 `<a>` 元素。

类型：

```ts
declare function Link(props: {
  prefetch?: boolean;
  to: string | Partial<{ pathname: string; search: string; hash: string }>;
  replace?: boolean;
  state?: boolean;
  reloadDocument?: boolean;
}): React.ReactElement;
```

示例：

```ts
import { Link } from 'alita';

function IndexPage({ user }) {
  return <Link to={user.id}>{user.name}</Link>;
}
```

`<Link to>` 支持相对路径跳转；`<Link reloadDocument>` 不做路由跳转，等同于 `<a href>` 的跳转行为。

若开启了 `prefetch` 则当用户将鼠标放到该组件上方时，Alita 就会自动开始进行跳转路由的组件 js 文件和数据预加载。

```ts
import { Link } from 'alita';

function IndexPage({ user }) {
  return <Link to={user.id} prefetch>{user.name}</Link>;
}
```

### NavLink

`<NavLink>` 是 `<Link>` 的特殊形态，他知道当前是否为路由激活状态。通常在导航菜单、面包屑、Tabs 中会使用，用于显示当前的选中状态。

类型：

```ts
declare function NavLink(props: LinkProps & {
  caseSensitive?: boolean;
  children?: React.ReactNode | ((props: { isActive: boolean }) => React.ReactNode);
  className?: string | ((props: { isActive: boolean }) => string | undefined);
  end?: boolean;
  style?: React.CSSProperties | ((props: { isActive: boolean }) => string | React.CSSProperties);
}): React.ReactElement;
```

下方示例分别用了 style、className 和 children 来渲染 active 状态。

```ts
import { NavLink } from 'umi';
 
function Navs() {
  return <ul>
    <li><NavLink to="message" style={({ isActive }) => isActive ? { color: 'red' } : undefined}>Messages</NavLink></li>
    <li><NavLink to="tasks" className={({ isActive }) => isActive ? 'active' : undefined}>Tasks</NavLink></li>
    <li><NavLink to="blog">{({ isActive }) => <span className={isActive ? 'active' : undefined}>Blog</span>}</NavLink></li>
  </ul>;
}
```

## HTML文档相关

### Helmet

`Helmet` 是内置 `plugin-helmet` 插件提供的组件，若组件引用失败，请检查 `plugin-helmet` 插件是否安装成功。

用来管理 HTML 文档标签（如标题、描述等）。

```ts
import { Helmet } from 'alita';
import React from 'react';
 
const App = () => (
  <>
    <Helmet>
      <title>Hello World</title>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
    <h1>Hello World</h1>
  </>
);
export default App;
```

将会在 html 页面的 `head` 标签内添加：

```
<head>
  <title>Hello World</title>
  <link rel="canonical" href="https://www.tacobell.com/" data-rh="true">
</head>
```
