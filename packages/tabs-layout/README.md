# @alitajs/tabs-layout

> 请不要和 keep alive 插件一起使用，两者功能上相似

## 安装

```bash
yarn add @alitajs/tabs-layout
```

## 配置

```ts
export default {
  plugins:['@alitajs/tabs-layout'],
  tabsLayout: [/./], // 这里表示所有的页面
};
```

`tabsLayout` 是一个数组，写明需要使用 tabs 的页面，支持字符串和正则表达式，如需要全部匹配，可以设置 `tabsLayout: [/./]`。

## 使用

需要使用 `TabsLayout` 替换 `children`。

```tsx
import React from 'react';
import { TabsLayout } from 'alita';

const BasicLayout: React.FC = props => {
  return (
    <div>
-     { props.children }
+     <TabsLayout {...props}/>
    </div>
  );
};

export default BasicLayout;
```

如果你的 props 有其他用途，那至少需要传给 `TabsLayout` 两个属性 `location`,`children`

```tsx
import React from 'react';
import { TabsLayout } from 'umi';

const BasicLayout: React.FC = ({ location, children }) => {
  return (
    <div>
      <TabsLayout location={location}>{children}</TabsLayout>
    </div>
  );
};

export default BasicLayout;
```
