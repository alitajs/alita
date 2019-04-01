export default {
  authority: {
    authorize: [
      {
        guard: ['src/Auth'],
        include: /\//,
        exclude: /\/user/i,
      },
    ],
  },
};
