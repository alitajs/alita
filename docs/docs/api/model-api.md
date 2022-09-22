# 数据共享API

在 src/models 下存在 useModel 文件，数据共享API才可以使用。

`plugin-model` 插件是基于 hooks 范式的简易数据管理方案（部分场景可以取代 dva），通常用于中台项目的全局共享数据。

## useModel

`useModel` 是一个 Hook，提供消费 Model 的能力，每个 Model 中包含数据和更新数据方法。约定在 src/models 目录下的文件为项目定义的 model 文件。每个文件需要默认导出一个 function，该 function 定义了一个 Hook，不符合规范的文件会被过滤掉。


示例：

*src/models/useAuthModel.js*

```ts
import { useState, useCallback } from 'react'

export default function useAuthModel() {
  const [user, setUser] = useState(null)

  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])

  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])

  return {
    user,
    signin,
    signout
  }
}
```

以上就是一个普通的自定义 hook，每次在组件中执行`const {user} = useAuthModel()` 所获取到的 `user` 都是不一样的。 而`plugin-model` 把其中的`user`变成了『全局数据』，多个组件中使用该 model 时，拿到的同一份数据。

```ts
import React from 'react';
import { useModel } from 'alita';
import type { FC } from 'react';

const Home: FC = () => {
  const { user, signin } = useModel('user', model => ({ user: model.user, signin: model.signin }));

  return <div>Home</div>
}

export default Home;
```

`useModel` 有两个参数，`namespace` 和 `updater`。

`namespace` - 就是 hooks model 文件的文件名，如上面例子里的 `useAuthModel`；

`updater` - 可选参数。在 hooks model 返回多个状态，但使用组件仅引用了其中部分状态，并且希望仅在这几个状态更新时 `rerender` 时使用（性能相关）。
