export default {
  analytics: {
    ga: 'G-ET6VJN7XQ8',
    baidu: '5a66c03cb0ae986f876184554f2b9e13',
  },
  plugins: [
    '@umijs/plugin-docs',
    require.resolve('./packages/plugins/src/analytics'),
  ],
  favicons: ['/logo.png'],
  mfsu: { strategy: 'normal' },
  routePrefetch: {},
  manifest: {},
  conventionRoutes: {
    exclude: [/\/components\//],
  },
};
