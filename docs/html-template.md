# HTML 模板

## 修改默认模板

新建 `src/pages/document.ejs`，umi 约定如果这个文件存在，会作为默认模板，内容上需要保证有 `<div id="root"></div>`，比如：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Your App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```
