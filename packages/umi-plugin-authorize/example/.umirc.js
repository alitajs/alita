import { join } from 'path';

export default {
  plugins: [
    ['umi-plugin-react', {
      routes: {
        exclude: [
          /exclude/,
        ],
      },
    }],[join(__dirname, '..', require('../package').main || 'index.js'),{
      authorize: [
        {
          guard: ["./routes/PrivateRoute.js"],
          include: /\/list/
        },
        {
          guard: ["./routes/PrivateRoute.js"],
          include: "scroll-to-top",
          exclude: "scroll-to-top/a"
        }
      ]
    }]
  ],
}
