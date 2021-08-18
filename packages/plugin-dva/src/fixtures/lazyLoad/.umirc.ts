
export default {
  routes: [
    { path: '/', component: 'index' },
  ],
  dva: {
    lazyLoad: true,
  },
  plugins: [
    require.resolve('../../'),
  ],
}
