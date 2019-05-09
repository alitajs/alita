# API

## 路由

### Link

通过声明的方式做路由跳转。

例子：

```markup
import {Link} from 'alita';

export default () => {
  <div>
    /* 普通使用 */
    <Link to="/list">Go to list page</Link>

    /* 带参数 */
    <Link to="/list?a=b">Go to list page</Link>

    /* 包含子组件 */
    <Link to="/list?a=b"><button>Go to list page</button></Link>
  </div>
}
```

### router

通过编程的方式做路由切换，包含以下 4 个 API 。

#### router.push(path)

推一个新的页面到 history 里。

例子：

```js
import {router} from 'alita';

// 普通跳转，不带参数
router.push('/list');

// 带参数
router.push('/list?a=b');
router.push({
  pathname: '/list',
  query: {
    a: 'b',
  },
});
# 对象且不包含 pathname 会报错
router.push({
  query: {}
});
```

#### router.replace(path)

替换当前页面，参数和 [router.push()](#router.push\(path\)) 相同。

#### router.go(n)

往前或往后跳指定页数。

例子：

```js
import {router} from 'alita';

router.go(-1);
router.go(2);
```

#### router.goBack()

后退一页。

例子：

```js
import {router} from 'alita';
router.goBack();
```

### umi/prompt

例子：

```js
import {Prompt} from 'alita';

export default () => {
  return (
    <>
      <h1>Prompt</h1>
      <Prompt
        when={true}
        message={(location) => {
          return window.confirm(`confirm to leave to ${location.pathname}?`);
        }}
      />
    </>
  );
}
```

详见：[https://reacttraining.com/react-router/web/api/Prompt](https://reacttraining.com/react-router/web/api/Prompt)

### umi/withRouter

layout 需要用withRouter包裹

详见：[https://reacttraining.com/react-router/web/api/withRouter](https://reacttraining.com/react-router/web/api/withRouter)

## 性能

### dynamic

动态加载组件，基于 [react-loadable](https://github.com/jamiebuilds/react-loadable) 实现。

#### dynamic(options)

例子：

```js
import {dynamic} from 'alita';

// 延时 1s 渲染的组件。
const App = dynamic({
  loader: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(() => <div>I will render after 1s</div>);
      }, /* 1s */1000);
    }));
  },
});

// 或者用 async 语法
const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
const App = dynamic({
  loader: async function() {
    await delay(/* 1s */1000);
    return () => <div>I will render after 1s</div>;
  },
});
```
