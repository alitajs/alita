export function render(oldRender: () => void) {
  function onDeviceReady() {
    oldRender();
  }
  document.addEventListener('deviceready', onDeviceReady, false);
}
