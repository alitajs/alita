import { IApi } from 'umi';

export default (api: IApi) => {
  api.describe({
    key: 'appType',
    config: {
      schema(Joi) {
        return Joi.string().valid(
          'h5',
          'pc',
          'docs',
          'cordova',
          'micro',
          'native',
        );
      },
      default: 'h5',
    },
  });

  if (api.userConfig.appType !== 'pc' || api.userConfig.appType !== 'docs') {
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
          box-sizing: border-box;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }

        html {
          width: 100%;
          height: 100%;
          text-size-adjust: 100%;
          --alita-safe-area-top: env(safe-area-inset-top);
          --alita-safe-area-bottom: env(safe-area-inset-bottom);
          --alita-safe-area-left: env(safe-area-inset-left);
          --alita-safe-area-right: env(safe-area-inset-right);
          --adm-font-size-main: 0.26rem !important;
        }

        body {
          background-color: #f5f5f9;
          font-size: 0.28rem;
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          margin-left: 0;
          margin-right: 0;
          margin-top: 0;
          margin-bottom: 0;
          padding-left: 0;
          padding-right: 0;
          padding-top: 0;
          padding-bottom: 0;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          max-width: 100%;
          height: 100%;
          max-height: 100%;
          text-rendering: optimizeLegibility;
          overflow: hidden;
          touch-action: manipulation;
          -webkit-user-drag: none;
          -ms-content-zooming: none;
          word-wrap: break-word;
          overscroll-behavior-y: none;
          text-size-adjust: none;
        }

        .alita-page {
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          position: absolute;
          flex-direction: column;
          justify-content: space-between;
          contain: layout size style;
          overflow: hidden;
          z-index: 0;
        }
        .alita-head{
          height: auto;
    flex-shrink: 0;
    padding-top: var(--alita-safe-area-top);
        }
        .alita-content {
          position: relative;
  z-index: 0;
  display: block;

  flex: 1;

  width: 100%;
  height: 100%;

  /* stylelint-disable */
  margin: 0 !important;

  padding: 0 !important;
  overflow-y: auto;
  touch-action: pan-y;

  will-change: scroll-position;
  /* stylelint-enable */

  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
        }
        .alita-footer{
          flex-shrink: 0;
        }
        input {
          border: none;
          outline: none;
        }
        textarea:disabled,
        input:disabled {
          background-color: transparent;
        }
        `,
      };
      return [addItem];
    });
  }
};
