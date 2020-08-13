# @umijs/plugin-access-layout

## 使用

使用 npm:

```bash
$ npm install --save-dev @umijs/plugin-access-layout
```

或者使用 yarn:

```bash
$ yarn add @umijs/plugin-access-layout --dev
```

## 说明

这个插件将 plugin-access 和 plugin-layout 插件的功能整合在一起，为了支持 Umi 的约定式用法，还有更多的动态设置方案。

## 特性

1、支持约定式和配置式 2、动态修改权限 3、动态使用菜单 4、支持运行时配置 Pro-Layout 5、支持页面级别配置 Pro-Layout 6、支持页面级权限 7、支持页面级修改权限 8、支持不使用 Pro-layout 9、兼容 Pro 旧项目的写法

## 搭配其他插件

1、配套 plugin-locale 使用，会默认开始国际化的菜单 2、配合 plugin-model 使用，可以使用 useModel('@@accessLayout') 3、配合 plugin-initial-state 使用，可以不指定权限判断数据

## Config 配置

```ts
accessLayout: {
  iconNames: ['smile'], // 约定式用法，需要将所有用到的 icon 名称写全，为了按需加载
  useModel: true, // 声明是否搭配了 plugin-model 使用
}
```

## 运行时配置

```ts
export const accessLayout = {
  title: 'Runtime Demo',
  // Pro-Layout 支持的所有配置
};
```

## 页面级配置

```ts
useEffect(() => {
  setLayoutConfig({
    title: 'PageSetDemo',
    // Pro-Layout 支持的所有配置
  });
}, []);
```

## 页面级别权限控制

```ts
import { useModel } from 'umi';
const { access } = useModel('@@accessLayout');
if (access.canAdmin) {
  // canAdmin 在src/access 中定义
  // 或者使用 setAccess 设置
  console.log('access.canAdmin');
}
```

## 页面级修改权限

```tsx
import { useModel } from 'umi';

const IndexPage: FC<PageProps> = ({ index, dispatch }) => {
  const { setAccess } = useModel('@@accessLayout');
  return (
    <div
      className={styles.center}
      onClick={() => setAccess({ canAdmin: false })}
    >
      点击操作权限
    </div>
  );
};
```

## 扩展菜单配置

可以指定部分页面不使用 layout

```ts
const menuData = [
  {
    path: '/login',
    hideLayout: true,
  },
];
```

## 支持约定式路由用法

```ts
// src/layouts/index
import { AccessLayout } from 'umi';

const BasicLayout = props => {
  // 这个数据可以是任意来源的，你可以在登录之后再去获取菜单数据
  const serveMenuData = [
    {
      path: '/',
      name: 'index',
      icon: 'smile',
    },
    {
      path: '/ListTableList',
      name: 'list',
      icon: 'heart',
      access: 'canAdmin',
    },
    {
      path: '/login',
      hideLayout: true,
    },
  ];
  // 这个数据会传递给 src/access.ts
  // 搭配 plugin-initial-state 使用的话，这个可以不传
  const initState = {
    currentUser: {
      access: 'admin',
    },
  };
  return (
    <AccessLayout
      initState={initState}
      menuData={serveMenuData}
      {...props}
    ></AccessLayout>
  );
};

export default BasicLayout;
```
