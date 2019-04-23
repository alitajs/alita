// ref:
// - https://umijs.org/plugin/develop.html
export default function (api, options) {
  api.registerCommand(
    'prettier',
    {
      description: 'prettier src all files',
      usage: `umi prettier`,
    },
    args => {
      require('child_process').exec('node ./prettier.js', [], (error, stdout, stderr) => {
        if (error) {
          console.error('exec error: ' + error)
          return
        }
        console.log(stdout)
        console.log(stderr)
      })
    })
}
