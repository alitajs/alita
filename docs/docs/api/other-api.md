## 其他API

### useKeepOutlets

该 API 需要在src/config/config.ts中配置 `keepalive` 才可以使用。

```ts
import { defineConfig } from 'alita';

export default defineConfig({
  keepalive: ['/list'],
});
```

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

