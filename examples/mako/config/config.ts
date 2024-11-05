import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'pc',
  mako: {},
  // 开了 mako 就要关 codeSplitting !!!
  codeSplitting: false,
});
