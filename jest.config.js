module.exports = {
  transformIgnorePatterns: [
    'node_modules/(?!.*(@(babel)|dva-loading))[^/]+?/(?!(es|node_modules)/)',
  ],
  testMatch: ['**/packages/**/?*.(test|spec).(j|t)s?(x)'],
  moduleNameMapper(memo) {
    return Object.assign(memo, {
      '^react$': require.resolve('react'),
      '^react-dom$': require.resolve('react-dom'),
    });
  },
};
