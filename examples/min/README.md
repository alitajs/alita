# 产物包最小

通过所有手段，让 alita 打出来的产物最小 dist 150KB

```bash
➜  min git:(master) ✗ pnpm build

> @examples/min@ build /alita/examples/min
> ANALYZE=1 BABEL_POLYFILL=none alita build

info  - alita v3.2.9
info  - Using Request Plugin
info  - Using ClassNames Plugin
info  - Umi v4.0.42
event - [Webpack] Compiled in 883 ms (314 modules)
Webpack Bundle Analyzer is started at http://127.0.0.1:8888
Use Ctrl+C to close it
info  - Memory Usage: 197.8 MB (RSS: 384.48 MB)

info  - File sizes after gzip:

  44.22 kB  dist/umi.d007731f.js
  529 B     dist/src__pages__index__index.e2bbf4aa.async.js

event - Build index.html
```

## ie

ie 上能跑的最小包 dist 491KB

```bash
➜  min git:(master) ✗ pnpm build

> @examples/min@ build /alita/examples/min
> ANALYZE=1 alita build

ready - legacy mode is enabled, we automatically modify the srcTranspiler, jsMinifier, cssMinifier to be compatible with IE 11
info  - alita v3.2.9
info  - Using Request Plugin
info  - Using ClassNames Plugin
info  - Umi v4.0.42
event - [Webpack] Compiled in 5035 ms (942 modules)
Webpack Bundle Analyzer is started at http://127.0.0.1:8888
Use Ctrl+C to close it
info  - Memory Usage: 487.41 MB (RSS: 692.8 MB)

info  - File sizes after gzip:

  150.66 kB (+44.15 kB)  dist/umi.075b0028.js
  512 B                  dist/src__pages__index__index.d1d347d8.async.js

event - Build index.html
```