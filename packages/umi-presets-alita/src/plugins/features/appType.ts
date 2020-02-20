import { IApi } from '@umijs/types';

export default (api: IApi) => {
  api.describe({
    key: 'appType',
    config: {
      schema(joi) {
        return joi.string();
      },
      default: 'h5',
    },
  });

  if (api.userConfig.appType !== 'pc') {
    api.modifyDefaultConfig(memo => {
      return {
        ...memo,
        hd: true,
      }
    });

    api.addHTMLMetas(() => {
      const addItem = {
        "content": "telephone=no",
        "name": "format-detection"
      }
      return [addItem];
    })

    api.addHTMLStyles(() => {
      const addItem = {
        "content": `* {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          html,
          body,
          #root {
            width: 100%;
            height: 100vh;
          }
          body {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-overflow-scrolling: touch;
          }
          input {
            border: none;
            outline: none;
          }
          #root {
            position: relative;
            overflow: scroll;
          }

          textarea:disabled,
          input:disabled {
            background-color: transparent;
          }`,
      }
      return [addItem];
    })
  }


};
