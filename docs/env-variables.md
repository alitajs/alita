# .env 和环境变量

## 如何配置

比如要

```
# OS X, Linux
$ MOCK=none umi dev

# Windows (cmd.exe)
$ set MOCK=none&&umi dev

# Or use cross-env for all platforms
$ yarn add cross-env --dev
$ cross-env MOCK=none umi dev

# .env
$ echo MOCK=none > .env
```

### ANALYZE

默认关闭。分析 bundle 构成，build 时有效。比如：

```bash
$ ANALYZE=1 umi build
```

### MOCK

默认开启 mock，值为 none 时禁用。比如：

```bash
$ MOCK=none umi dev
```
