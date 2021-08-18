
export default {
  routes: [
    { path: '/', component: 'index' },
  ],
  dva: {
    immer: true,
  },
  plugins: [
    require.resolve('../../'),
  ],
}
