import { defineConfig } from 'alita';

export default defineConfig({
  appType: 'h5',
  keepalive: [/list/],
  aconsole: {
    console: {},
    inspx: {},
  },
  mobileLayout: 'mobile5',
  mfsu: {},
  hash: false,
  npmClient: '{{{ npmClient }}}'
});
