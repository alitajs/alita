# @alitajs/keep-alive

## 安装

```bash
yarn add @alitajs/keep-alive
or
npm i @alitajs/keep-alive
```

## 启用方式

配置`keepalive:[]`开启。

## 介绍

暂时的 keep alive 实现，有点投机。我们有多个项目用于生产环境中。你需要自行评估风险。采用的方案，是在 layout 自己维护一份组件的显示或者隐藏，通过控制 key 变化，来实现的。等 Umi 官方的 keep alive 推出，我们会在底层采用 Umi 的方案，而保持以下的 api 不变，这意味着，你可以无感优化。

需要使用组件包裹 layout 的最内层。原理就是劫持了 `children`。

## 配置

比如：

```js
export default {
  plugins: ['@alitajs/keep-alive'],
  keepalive: ['/pathname'],
};
```

## 使用

```ts
// src/layouts/index.tsx
import { KeepAliveLayout } from 'umi';
const BasicLayout: React.FC = (props) => {
  return (
    <OtherLayout>
      <KeepAliveLayout {...props}>{children}</KeepAliveLayout>
    </OtherLayout>
  );
};
```

## umi 接口

常用方法可从 umi 直接 import。

比如：

```js
import { dropByCacheKey, patchKeepAlive } from 'umi';
```

接口包含

### dropByCacheKey

解除状态保持

```ts
// src/pages/list/index.tsx
import { dropByCacheKey } from 'umi';
const Page: React.FC = (props) => {
  return (
    <div
      onClick={() => {
        dropByCacheKey('/list');
      }}
    >
      Click dropByCacheKey
    </div>
  );
};
```

### patchKeepAlive

动态修改 keepalive 配置

```ts
// 假如 config 中配置 keepalive: []
import { patchKeepAlive } from 'umi';
const Page: React.FC = (props) => {
  return (
    <div
      onClick={() => {
        //
        patchKeepAlive((config) => {
          // 这里可以获取到最新的 keepalive 配置
          config.push('/list');
          // 操作配置之后返回
          return config;
        });
      }}
    >
      Click patchKeepAlive
    </div>
  );
};
```

## FAQ

1、相关 issues https://github.com/umijs/umi/issues/3091
