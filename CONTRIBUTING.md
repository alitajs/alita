# Contributing to alita

## Set up

Install dev deps after git clone the repo.

```bash
# npm is not allowed.
$ yarn
```

Link alita globally.

```bash
$ cd packages/alita
$ yarn link
$ cd -
```

Try the `alita` cli.

```bash
$ yarn build
$ alita -v
alita@0.0.1-alpha.1@local
```

## Build

Transform with babel and rollup.

```bash
$ yarn build

# Build and monitor file changes
$ yarn build --watch

# Build specified package only
$ PACKAGE=core yarn build --watch
```

## Test

```bash
$ yarn test

# Test specified file and watch
$ yarn test getMockData.test.js -w

# Test specified package
$ yarn test --package core

# Generate coverage
$ yarn test --coverage
```

## Release

```bash
$ npm run release
$ npm run release -- --publish-only
$ npm run release -- --skip-git-status-check
$ npm run release -- --skip-build
```

## Create new package

Such as creating package `foo`.

```bash
$ mkdir -p packages/foo
$ yarn bootstrap
```

Then you will find the `README.md` and `package.json` is generated in `packages/foo`.

```bash
$ tree packages/foo
packages/foo
├── README.md
└── package.json
```

change the `authors` in package.json.

## Upgrade dependencies

```bash
$ yarn update:deps
```

## sync to cnpm

```bash
$ yarn sync
```
