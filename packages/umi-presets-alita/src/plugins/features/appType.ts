import { IApi } from '@umijs/types';

// h5,cordova,pc,micro
export default (api: IApi) => {
  api.describe({
    key: 'appType',
    config: {
      schema(joi) {
        return joi.string().valid('h5', 'pc', 'cordova', 'micro', 'native');
      },
      default: 'h5',
    },
  });

  if (api.userConfig.appType !== 'pc') {
    api.modifyDefaultConfig((memo) => {
      return {
        ...memo,
        hd: {},
        // lessLoader: {
        //   modifyVars: {
        //     'hack': `true; @import "~antd-mobile/es/style/themes/default.less";`
        //   }
        // }
      };
    });

    api.addHTMLMetas(() => {
      const addItem = {
        content: 'telephone=no',
        name: 'format-detection',
      };
      return [addItem];
    });

    api.addHTMLStyles(() => {
      const addItem = {
        content: `* {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          html,
          body,
          #root {
            width: 100%;
          }
          #root > div {
            /* Status bar height on iOS 11.0 */
            padding-top: constant(safe-area-inset-top);
            padding-bottom: constant(safe-area-inset-bottom);
            /* Status bar height on iOS 11+ */
            padding-top: calc(env(safe-area-inset-top) * 2);
            padding-bottom: calc(env(safe-area-inset-bottom) * 2);
          }

          .alita-layout-head {
            top: calc(env(safe-area-inset-top) * 2) !important;
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
      };
      return [addItem];
    });
  } else {
    // api.modifyDefaultConfig(memo => {
    //   return {
    //     ...memo,
    //     lessLoader: {
    //       modifyVars: {
    //         'hack': `true; @import "~antd/es/style/themes/default.less";`
    //       }
    //     }
    //   }
    // });
  }
};
