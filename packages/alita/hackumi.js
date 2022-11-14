const { join, dirname } = require('path');
const { copyFileSync } = require('fs');

const file = join(__dirname, 'templates', 'umi.tpl');

const target = join(dirname(require.resolve('@umijs/preset-umi/package.json')), 'templates');
const target1 = join(target, 'umi_back.tpl');
const target2 = join(target, 'umi.tpl');
console.log(`[COPY] to ${target1}`);
copyFileSync(target2, target1);
copyFileSync(file, target2);
