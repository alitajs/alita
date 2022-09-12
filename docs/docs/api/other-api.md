## 其他API

### useKeepOutlets

该 API 是内置 `plugin-keepalive` 插件，若 API 引用失败，请检查 `plugin-keepalive` 插件是否安装成功。

如果你没有使用 `mobileLayout`，而是自定义的 `layout` ，即项目中存在 `src/layouts/index.tsx`。
需要使用 `useKeepOutlets` 获取到 `OutLet`，才能使用 `keepalive` 配置需要状态保持的路由。 

```ts
import React from 'react';
import type {FC} from 'react';
import { useKeepOutlets} from 'alita';

const Layout: FC = () => {
  const OutLet = useKeepOutlets();
  return <>{OutLet}</>;
};

export default Layout;
```

