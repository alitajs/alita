# Contribute

> Notice: `y` is the alias for `yarn`, `n` is the alias for `npm`.

## Set up

Install dev deps after git clone the repo.

```bash
$ y
```

Bootstrap every package with yarn. (Need to execute when new package is included)

```bash
$ y bootstrap
```

Link alita globally.

```bash
$ cd packages/alita
$ y link
```

## Common Tasks

Monitor file changes and transform with babel.

```bash
$ y build --watch
```

Run test.

```bash
# Including e2e test
$ y test

# Unit test only
$ y debug .test.(t|j)s

# Test specified file and watch
$ y debug getMockData.test.js -w
```

Run `alita dev` in examples/func-test.

```bash
$ cd examples/func-test
$ alita dev
```

Then open http://localhost:8000/ in your browser.

Run `alita build` in examples/simple.

```bash
$ cd examples/func-test
$ alita build

# Build without compress
$ COMPRESS=none alita build
```

Publish to npm.

```bash
# Can't use yarn for this command.
$ n run publish
```
