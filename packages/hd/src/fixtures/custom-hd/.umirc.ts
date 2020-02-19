
export default {
  history: {
    type: 'memory',
    options: {
      initialEntries: ['/'],
    },
  },
  hd: true,
  mountElementId: '',
  routes: [
    { path: '/', component: 'index' },
  ],
}
