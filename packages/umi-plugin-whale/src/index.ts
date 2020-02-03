
// ref:
// - https://umijs.org/plugin/develop.html

export default function (api, options) {
  // Example: output the webpack config
  // <meta content="telephone=no" name="format-detection" />
  if (api.config.appType !== 'pc') {
    api.addHTMLMeta(memo => {
      const addItem = {
        "content": "telephone=no",
        "name": "format-detection"
      }
      return [addItem, ...memo];
    })

    api.addHTMLStyle(memo => {
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
      return [addItem, ...memo];
    })
  }
}
