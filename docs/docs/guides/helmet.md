# Helmet

管理 HTML 文档标签（如标题、描述等）

## 用法

```tsx
import { Helmet } from 'alita';
import React from 'react';

const App = () => (
  <>
    <Helmet>
      <title>Hello World</title>
      <link rel="canonical" href="https://www.tacobell.com/" />
    </Helmet>
    <h1>Hello World</h1>
  </>
);

export default App;
```