#!/usr/bin/env node
// setNodeTitle
process.title = 'alita';
// Use magic to suppress node deprecation warnings
// See: https://github.com/nodejs/node/blob/master/lib/internal/process/warning.js#L77
// @ts-ignore
process.noDeprecation = '1';
process.env.DID_YOU_KNOW = 'none';
// 关闭 umi 你知道吗 功能
// TODO: [你知道吗] 这个功能很好，但是有些提示在做配置内收的 alita 里面提示出来，感觉怪怪的。比如推荐 @umijs/max。所以先关掉，想想该怎么处理
process.env.DID_YOU_KNOW = 'none';
// disable since it's conflicted with typescript cjs + dynamic import
// require('v8-compile-cache');
require('../dist/cli')
    .run()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });