// ref:
// - https://umijs.org/plugin/develop.html

export default function (api, options) {
  // dev
  // 1.cordova create
  // 1.1 generate config.xml
  // 1.2 touch hooks,platforms,plugins,res,www

  // 2.cordova platforms add ios
  // 3.node config-xml.js true
  // 4.cordova build ios
  // 5.node serve-cordova.js ios
  // 6.add app.js
  //  export function render(oldRender) {
  //    function onDeviceReady() {
  //      oldRender();
  //    }
  //    document.addEventListener('deviceready', onDeviceReady, false);
  //  }
  // 7.add cordova.js
  //  <% if(context.env === 'production') { %>
  //    <script src="./cordova.js"></script>
  //  <% } else {%>
  //    <script src="http://192.168.3.111:8001/cordova.js"></script>
  //  <% } %>
  // 8.umi dev

  // build
  // 1. outputPath:'www',
  // 2. umi build
  // api.onBuildSuccess(() => {
  //   console.log('[umi]: success');
  // });
  // 3. node config-xml.js false
  // 4. cordova build ios
  api.onBuildSuccess(() => {
    console.log('[umi]: success');
  });
}
