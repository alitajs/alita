// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';
import { readFileSync } from 'fs';

export default function(api, options) {
  // Example: output the webpack config
  api.addRuntimePluginKey('request');
  function generateRequest() {
    const tpl = join(__dirname, './request.js');
    const tplContent = readFileSync(tpl, 'utf-8');
    api.writeTmpFile('request.js', tplContent);
  }
  api.onGenerateFiles(() => {
    generateRequest();
  });

  api.modifyAFWebpackOpts(memo => {
    return {
      ...memo,
      alias: {
        ...(memo.alias || {}),
        'alita-request': '@tmp/request',
      },
    };
  });
}
