# 升级到 Alita 3

## 升级步骤

升级到 Alita 3 只需要简单的几步操作就能完成，简单的描述整个过程就是 - “重装依赖，修改配置”：

1. **依赖处理**
2. **非官方插件升级**
3. **配置层迁移**
4. **代码层修改**

### 依赖处理

项目的 `package.json` 需要升级 alita。

```diff
{
  "devDependencies": {
+   "alita": "^3.0.0",  
-   "alita": "^2.8.0",
  }
}
```

删除 `node_module`，执行下 `npm install` 重装依赖。

### 代码层修改

alita 3 中将 react-router@5 升级到 react-router@6，所以路由相关的一些 api 存在着使用上的差异。

props 默认为空对象，以下属性都不能直接从 props 中取出
![image](https://img.alicdn.com/imgextra/i4/O1CN01H9ScQv21ymaLkwZ8p_!!6000000007054-2-tps-1210-374.png)

#### children

```typescript
import { Outlet } from 'alita';
<Outlet/>
```

主要在全局 layout 中需要修改

如 `layouts/index.tsx`：

```diff
import React from 'react';
+ import { Outlet } from 'alita';

export default function Layout(props) {
  return (
    <div>
-      { props.children }
+      <Outlet />
    </div>
  );
}
```

#### history

```diff
+ import { history } from 'alita';

export default function Page(props) {
  return (
    <div onClick={()=>{
-          props.history.push('list'); 
+          history.push('list'); 
    }}>
    </div>
  );
}
```

#### location

```diff
+ import { history } from 'alita';
export default function Page(props) {
  return (
    <div>
-     { props.location }
+     { history.location }
    </div>
  );
}
```

或者

```diff
+ import { useLocation } from 'alita';
export default function Page(props) {
+    let location = useLocation();
  return (
    <div>
-     { props.location }
+     { location }
    </div>
  );
}
```

#### match


```diff
+ import { useMatch } from 'alita';
export default function Page(props) {
+ const match = useMatch({ path: 'list/search/:type' });
  return (
    <div>
-     { props.match }
+     { location }
    </div>
  );
}
```

需要注意 match 数据的差异：

```ts
// match v5
isExact: true
params: {}
path: "/users/abc"
url: "/users/abc"

// match v6
params:{  }
pathname: "/list/search/articles"
pathnameBase: "/list/search/articles"
pattern: {path: 'list/search/:type'}
```

更多改动和 api 变更，请查阅 [react-router@6](https://reactrouter.com/docs/en/v6/api#uselocation)


完成以上操作后，执行下 `alita dev`，访问 [http://localhost:8000](http://localhost:8000)，请验证所有功能都符合预期。

如果你的项目无法正常启动，你可能还需要做如下操作：

## 配置变更

TODO

## FAQ

### location 中的 query 找不到？

location 中的 query 不再支持了，后续推荐用 [search](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

```diff
- const { query } = history.location;
+ import { parse } from 'querystring';
+ const query = parse(history.location.search);
```

### *.d 文件找不到，或者它的引用找不到

在 alita@3 中通过 `import` 会自动找到同名的 `.d.ts` 文件，如：

`import { ButtonType } from './button';`

如果存在 `.button.d.ts` 文件，在 alita@3 中会正确执行，但是在 alita@4 中会发生报错，你可能需要更加规范的引用类型。

```diff
- import { ButtonType } from './button';
+ import type { ButtonType } from './button.d';
```