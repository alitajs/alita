// ref:
// - https://umijs.org/plugin/develop.html

export default function (api, options) {
  // Example: output the webpack config
  // <meta content="telephone=no" name="format-detection" />
  api.addHTMLMeta(memo => {
    const addItem = {
      "content": "telephone=no",
      "name": "format-detection"
    }
    return [addItem, ...memo];
  }
  )
}
