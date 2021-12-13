#!/usr/bin/env node
// setNodeTitle
process.title = 'alita';
// Use magic to suppress node deprecation warnings
// See: https://github.com/nodejs/node/blob/master/lib/internal/process/warning.js#L77
// @ts-ignore
process.noDeprecation = '1';
require('v8-compile-cache');
require('../dist/cli')
    .run()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });