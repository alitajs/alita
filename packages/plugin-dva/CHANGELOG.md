# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.13.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.12.1...@umijs/plugin-dva@0.13.0) (2021-06-03)

### Features

- **layout:** renderRightContent support locale ([#624](https://github.com/umijs/plugins/issues/624)) ([6d3fc2d](https://github.com/umijs/plugins/commit/6d3fc2df3f75b3e700b78a9e267099c7f70be47b))

## [0.12.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.12.0...@umijs/plugin-dva@0.12.1) (2021-05-08)

### Bug Fixes

- **ssr:** dva app ins conflict ([#603](https://github.com/umijs/plugins/issues/603)) ([c927a16](https://github.com/umijs/plugins/commit/c927a16c4f7106b1050c9f3d2f08384c2cc07bc7))

# [0.12.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.11.1...@umijs/plugin-dva@0.12.0) (2021-04-20)

### Features

- plugin dva support config immer.enableAllPlugins ([#585](https://github.com/umijs/plugins/issues/585)) ([2fe25d5](https://github.com/umijs/plugins/commit/2fe25d50581d869ed694fb886ea5649fd860dc90))

## [0.11.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.11.0...@umijs/plugin-dva@0.11.1) (2021-04-09)

### Bug Fixes

- **dva:** dva model import undefined when from umi ([#523](https://github.com/umijs/plugins/issues/523)) ([1d8fb78](https://github.com/umijs/plugins/commit/1d8fb78e6ccda237307867bb0954fb840c95f930))

# [0.11.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.10.0...@umijs/plugin-dva@0.11.0) (2021-03-26)

### Features

- improve dva log ([#562](https://github.com/umijs/plugins/issues/562)) ([4d84817](https://github.com/umijs/plugins/commit/4d84817a041fd259afb6a8c7f6abfac16e7925e5))

# [0.10.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.9.1...@umijs/plugin-dva@0.10.0) (2021-01-13)

### Features

- plugin dva support config immer.enableES5 ([#505](https://github.com/umijs/plugins/issues/505)) ([969d9d8](https://github.com/umijs/plugins/commit/969d9d8b3ba4f0e9cdfc9c6854adfed0458fcb6d))

## [0.9.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.9.0...@umijs/plugin-dva@0.9.1) (2020-09-24)

**Note:** Version bump only for package @umijs/plugin-dva

# [0.9.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.8.2...@umijs/plugin-dva@0.9.0) (2020-09-15)

### Features

- **dva:** support config disableModelsReExport, don't reexport model in connect.ts ([#366](https://github.com/umijs/plugins/issues/366)) ([0f40f1d](https://github.com/umijs/plugins/commit/0f40f1d038e04ebc959a49d62a42b78177f14995))

## [0.8.2](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.8.1...@umijs/plugin-dva@0.8.2) (2020-08-25)

### Bug Fixes

- **dva:** upperCamelCase model's default specifier ([#342](https://github.com/umijs/plugins/issues/342)) ([ef3fc39](https://github.com/umijs/plugins/commit/ef3fc39209abf445b5670cc829099b6aad2d2de1))

## [0.8.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.8.0...@umijs/plugin-dva@0.8.1) (2020-08-25)

### Bug Fixes

- dva model register duplicate ([#340](https://github.com/umijs/plugins/issues/340)) ([4845db8](https://github.com/umijs/plugins/commit/4845db80b0521c13396f05f064b4742859fa26f2))

# [0.8.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.7.4...@umijs/plugin-dva@0.8.0) (2020-08-25)

### Features

- enhancement for mfsu ([#326](https://github.com/umijs/plugins/issues/326)) ([655c0da](https://github.com/umijs/plugins/commit/655c0da475748a0671dd3a5de8ab079dbe1bed5a))

## [0.7.4](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.7.3...@umijs/plugin-dva@0.7.4) (2020-07-01)

### Bug Fixes

- **plugin-dva:** add RequiredConnectProps ([#285](https://github.com/umijs/plugins/issues/285)) ([fd2ba9c](https://github.com/umijs/plugins/commit/fd2ba9cb11854adc6c4d055454fdcbcbc41f2c01))

## [0.7.3](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.7.2...@umijs/plugin-dva@0.7.3) (2020-06-30)

### Bug Fixes

- **plugin-dva:** add query props ([#278](https://github.com/umijs/plugins/issues/278)) ([d2d9cb6](https://github.com/umijs/plugins/commit/d2d9cb6cc7a05791b8e1d374fedb1f79d5dae8df))

## [0.7.2](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.7.1...@umijs/plugin-dva@0.7.2) (2020-05-21)

### Bug Fixes

- ctx should return ([#227](https://github.com/umijs/plugins/issues/227)) ([545b6f2](https://github.com/umijs/plugins/commit/545b6f20e4fb5869d048a9bfe0dd2a41a545d061))

## [0.7.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.7.0...@umijs/plugin-dva@0.7.1) (2020-05-19)

### Reverts

- Revert "fix: change connect.ts name (#207)" (#219) ([003ab70](https://github.com/umijs/plugins/commit/003ab70324d2d8be89832d064467eacd41726cf3)), closes [#207](https://github.com/umijs/plugins/issues/207) [#219](https://github.com/umijs/plugins/issues/219)

# [0.7.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.5...@umijs/plugin-dva@0.7.0) (2020-05-19)

### Bug Fixes

- change connect.ts name ([#207](https://github.com/umijs/plugins/issues/207)) ([5a50acc](https://github.com/umijs/plugins/commit/5a50acc79315041938dcb0c15e5c4f763c9b13d3))

### Features

- support dva ssr ([#199](https://github.com/umijs/plugins/issues/199)) ([9930e41](https://github.com/umijs/plugins/commit/9930e412fec9958af8122cca29d3e60ef0d9dbdd))

## [0.6.5](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.4...@umijs/plugin-dva@0.6.5) (2020-04-09)

### Bug Fixes

- **plugin-dva:** add immer reducer type ([#143](https://github.com/umijs/plugins/issues/143)) ([5abaabf](https://github.com/umijs/plugins/commit/5abaabf239f79d2fe7c25c3f62f0a922a31d7fee))

## [0.6.4](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.3...@umijs/plugin-dva@0.6.4) (2020-03-20)

**Note:** Version bump only for package @umijs/plugin-dva

## [0.6.3](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.2...@umijs/plugin-dva@0.6.3) (2020-03-18)

**Note:** Version bump only for package @umijs/plugin-dva

## [0.6.2](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.1...@umijs/plugin-dva@0.6.2) (2020-03-18)

### Bug Fixes

- access hmr ([baacdf2](https://github.com/umijs/plugins/commit/baacdf22bf84682c90698d722866aa8fe6f8edb9))
- dva-loading types ([#109](https://github.com/umijs/plugins/issues/109)) ([fddd325](https://github.com/umijs/plugins/commit/fddd325842da0c8eecfb18564cda62e9ee57acbc))

## [0.6.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.6.0...@umijs/plugin-dva@0.6.1) (2020-03-12)

**Note:** Version bump only for package @umijs/plugin-dva

# [0.6.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.5.3...@umijs/plugin-dva@0.6.0) (2020-03-12)

### Features

- add dva page typings ([#76](https://github.com/umijs/plugins/issues/76)) ([d1a90a7](https://github.com/umijs/plugins/commit/d1a90a7a53400f35a920ee4a87d07422f6b5e1b7))

## [0.5.3](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.5.2...@umijs/plugin-dva@0.5.3) (2020-03-05)

**Note:** Version bump only for package @umijs/plugin-dva

## [0.5.2](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.5.1...@umijs/plugin-dva@0.5.2) (2020-03-05)

### Bug Fixes

- **plugin-dva:** uniq models list ([10c620e](https://github.com/umijs/plugins/commit/10c620e0dc2b72bd75dc04ee9525b139889e0a43))

## [0.5.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.5.0...@umijs/plugin-dva@0.5.1) (2020-03-05)

### Bug Fixes

- **plugin-dva:** config resolve problem ([7a0820f](https://github.com/umijs/plugins/commit/7a0820fee4e217ff9fd11d44df16fc97e0c99700))

# [0.5.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.4.0...@umijs/plugin-dva@0.5.0) (2020-03-04)

### Features

- **plugin-dva:** add getDvaApp exports from umi, and fix connect exports definitaion ([1cdb96a](https://github.com/umijs/plugins/commit/1cdb96a0c5b402d8260c2f5dc9afc35158dc5dec))
- **plugin-dva:** export more hooks api form dva@2.6 ([4b9ab3a](https://github.com/umijs/plugins/commit/4b9ab3a0b63aa3ec6f8c5a79317545f09879a49c))
- **plugin-dva:** support opts.extraModels and opts.skipModelValidate ([b374330](https://github.com/umijs/plugins/commit/b374330575da62d10743ee2cdb2950585f026163))
- support resolve model.ts files ([fb617a8](https://github.com/umijs/plugins/commit/fb617a813289df2956a7d59760825ae5f657dfbe))

# [0.4.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.3.0...@umijs/plugin-dva@0.4.0) (2020-03-04)

### Bug Fixes

- **plugin-dva:** support more dva model write manners ([d4f79b1](https://github.com/umijs/plugins/commit/d4f79b1798c7cd73cefc69ad32eb6b7992cb578b))

### Features

- umi dva list model ([cf6aed4](https://github.com/umijs/plugins/commit/cf6aed4f3d8e7870c97194c57c02b6ee67c08d29))

# [0.3.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.2.0...@umijs/plugin-dva@0.3.0) (2020-02-26)

### Bug Fixes

- **plugin-dva:** config types ([81caca1](https://github.com/umijs/plugins/commit/81caca172913b3945ecbc9b3fb44b5cae2125eb0))

### Features

- following the DvaContainer lifecycle to create/destroy dva instance ([#48](https://github.com/umijs/plugins/issues/48)) ([7b75f7b](https://github.com/umijs/plugins/commit/7b75f7b5244b2eccc8d4a1adbdadf502fe58018f))

# [0.2.0](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.1.2...@umijs/plugin-dva@0.2.0) (2020-02-18)

### Features

- **plugin-dva:** disable dva if no valid models found ([bdd8475](https://github.com/umijs/plugins/commit/bdd8475c631c8460668562f563d19c3052876730))
- **plugin-dva:** import connect from umi ([988cc37](https://github.com/umijs/plugins/commit/988cc3749654f21efc203b79efc56ac2c9327c29))
- **plugin-dva:** opts.immer ([d697a98](https://github.com/umijs/plugins/commit/d697a98059f1cd73cbd66edbe424ee0fd9d39b0d))
- **plugin-dva:** resolve page models ([066c7cd](https://github.com/umijs/plugins/commit/066c7cdafaea3a94f9c242a6d1f98a1871596440))

## [0.1.2](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.1.1...@umijs/plugin-dva@0.1.2) (2020-02-08)

**Note:** Version bump only for package @umijs/plugin-dva

## [0.1.1](https://github.com/umijs/plugins/compare/@umijs/plugin-dva@0.1.0...@umijs/plugin-dva@0.1.1) (2020-02-04)

### Bug Fixes

- dep not found in tpl ([797c450](https://github.com/umijs/plugins/commit/797c450b4fb6f77c4ac0041092d328896c9dce20))

# 0.1.0 (2020-02-04)

### Bug Fixes

- ci ([0103895](https://github.com/umijs/plugins/commit/0103895dc6f4cf63bb8e0da120494b2d7e40af01))
- config problem and babel plugin's options could not be true ([8eff10c](https://github.com/umijs/plugins/commit/8eff10cbc9bad5c85a2fc52db2f0e772e53c4da4))
- **plugin-dva:** dva-loading's path ([b9114b6](https://github.com/umijs/plugins/commit/b9114b6cf0a3e809eabb40685ee8e1c027c5e5ea))
- **plugin-dva:** model check support identifier ([e7f8d7c](https://github.com/umijs/plugins/commit/e7f8d7c93d7ba5f0afe3b8626b579026eed0875e))

### Features

- plugin-antd ([4ea5101](https://github.com/umijs/plugins/commit/4ea510187687fb9ce45449c6a6bb07182b761edc))
- plugin-dva ([a213ec9](https://github.com/umijs/plugins/commit/a213ec978115bcbfb46e514ce2eb05f7bfeb8039))
- plugin-locale ([b884b75](https://github.com/umijs/plugins/commit/b884b7568eb7f677bc5a8341b8d7c52c252f7c6a))
