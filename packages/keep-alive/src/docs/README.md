# @alitajs/keep-alive

## Usage

Install via yarn or npm.

```bash
$ yarn add @umijs/keep-alive
```

Configure it in the `.umirc.js`.

```js
export default {
  plugins: ['@alitajs/keep-alive'],
  keepalive:['/list'],
};
```

```js
import { KeepAliveLayout } from 'umi';

export default (props) => <KeepAliveLayout {...props} />;
```
