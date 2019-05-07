export function render(oldRender) {
  function onDeviceReady() {
    oldRender();
  }
  document.addEventListener('deviceready', onDeviceReady, false);
}
