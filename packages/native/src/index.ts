import { IApi } from 'umi';

export default function (api: IApi) {

  api.describe({
    key: 'native',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });

  api.registerCommand(
    {
      name: 'native',
      fn: ({ args }) => {

      }
    })
}
