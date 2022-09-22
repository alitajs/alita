# 状态管理API

状态是数据的变化，状态管理既是对数据的变化的管理。

在 src/models 下存在 dva model 文件，状态管理API才可以使用。

例如在以下目录结构中，useAuth.ts 是一个 dva model 文件。

```
├── models
│   ├── useAuth.ts
```

useAuth.ts 文件内容如下所示：

```ts
import { query } from '@/services/api';
import type { DvaModel } from 'alita';

export interface UseAuthModelState {
  name: string;
  sex: string;
}

const UseAuthModel: DvaModel<UseAuthModelState> = {
  namespace: 'useAuth',

  state: {
    name: '张三',
    sex: '男',

  },

  effects: {
    *queryName({ payload }, { call, put }): any {
      const data = yield call(query, payload);
      yield put({
        type: 'save',
        payload: { name: data.text },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default UseAuthModel;
```
## connect

其作用是将 model 和 组件连接起来，同时被 `connect` 的 组件会自动在 `props` 中拥有 `dispatch` 方法。


`connect` 是一个函数，返回一个 React 容器组件，也是个函数，其参数是一个要和 model 连接的组件，连接后就可以把 model 中的 `state` 数据添加到组件的 `props` 中。

`connect` 的参数是一个函数，其参数是一个对象，包含 model 中所有的 `state`，示例如下：

```json
{
  "useAuth": {
    "name": "张三",
    "sex": "男"
  },
}
```

其键值是每个 model 中的 `namespace` 的值，若没有设置 `namespace` ，则为 model 的文件名。

该函数会返回一个对象，该对象会添加到要和 model 连接的组件的 `props` 中。

示例：

```ts
import { connect } from 'alita';
import type { FC } from 'react';

const Foo: FC = (props) => {
  console.log(props);
  /** props
   * {
      dispatch: f(),
      "name": "张三",
      "sex": "男"
    }
  */
  return (
    <div>Foo</div>
  )
}

export default connect((state) => {
  return state.useAuth;
})(Foo);
```

## useSelector

在不使用 `connect` 连接 model 和组件的情况下，也能获取到 model 中的 state。

`useSelector` 的参数是一个函数，其参数是是一个对象，包含 model 中所有的 `state`，示例如下：

```json
{
  "useAuth": {
    "name": "张三",
    "sex": "男"
  },
}
```

其键值是每个 model 中的 `namespace` 的值，若没有设置 `namespace` ，则为 model 的文件名。

可以对 state 进行查找、筛选、处理后获得一个或者多个派生的 state。

而且每次 state 有更新，`useSelector` 会重新计算一次，返回新的结果，并重新渲染当前组件。

```ts
import { useSelector } from 'alita';
import type { FC } from 'react';

const Foo: FC = () => {
  const state = useSelector((state: any) => {
    return state.useAuth
  })
  return (
    <div>{state.name}</div>
  )
}

export default Foo;
```

## useDispatch

在不使用 `connect` 连接 model 和组件的情况下，也能使用`useDispatch` 获取到 `dispatch`。


```ts
import { useDispatch } from 'alita';
import type { FC } from 'react';

const Foo: FC = () => {
  const dispatch = useDispatch();
  const useAuth = useSelector((state: any) => {
    return state.useAuth
  })
  return (
    <div
      onClick={() =>{
        dispatch({
          type: 'useAuth/save',
          payload: {
            name: '王五',
          },
        });
      }}
    >{useAuth.name}</div>
  )
}

export default Foo;
```
## useStore

用来获取底层的 Store 方法：

* getState()

`getState()` 只会获得当前时刻的 state，而且state 更新后，`getState()` 不会再次调用，从而组件不会被重新选项，如下所示，点击【张三】，不会变成【王五】。

```ts
import { useDispatch, useStore } from 'alita';
import type { FC } from 'react';

const Foo: FC = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const state = store.getState();
  const { useAuth } = state;
  return (
    <div
      onClick={() => {
        dispatch({
          type: 'useAuth/save',
          payload: {
            name: '王五',
          },
        });
      }}
    >{useAuth.name}</div>
  )
}

export default Foo;
```

* dispatch(action)

```ts
import { useStore, useSelector } from 'alita';
import type { FC } from 'react';

const Foo: FC = () => {
  const store = useStore();
  const useAuth = useSelector((state: any) => {
    return state.useAuth
  })
  return (
    <div
      onClick={() => {
        store.dispatch({
          type: 'useAuth/save',
          payload: {
            name: '王五',
          },
        });
      }}
    >{useAuth.name}</div>
  )
}

export default Foo;
```

* subscribe(listener)

添加一个变化监听器，每当 dispatch 的时候就会执行，可以在监听器中使用 `getState()` 获得当前 state。

```ts
import { useStore } from 'alita';
import { useState } from 'react';
import type { FC } from 'react';

const Foo: FC = () => {
  const store = useStore();
  const state = store.getState();
  const { useAuth } = state;
  const [name, setName] = useState(useAuth.name);
  const listener = () => {
    const state = store.getState();
    const { useAuth } = state;
    setName(useAuth.name)
  }
  store.subscribe(listener)
  return (
    <div
      onClick={() => {
        store.dispatch({
          type: 'useAuth/save',
          payload: {
            name: '王五',
          },
        });
      }}
    >{name}</div>
  )
}

export default Foo;
```

* replaceReducer(nextReducer)

## getDvaApp

获取 dva 实例。
