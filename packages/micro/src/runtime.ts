export function render(oldRender: () => void) {
  function onDeviceReady() {
    oldRender();
  }
  if ((window as any).AlitaJSBridge) {
    onDeviceReady();
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener('AlitaBridgeReady', onDeviceReady, false);
  }
}

// test
// var myEvent = new CustomEvent('AlitaBridgeReady', {});
// // 随后在对应的元素上触发该事件
// if(document.dispatchEvent) {
//   document.dispatchEvent(myEvent);
// } else {
//   document.fireEvent(myEvent);
// }
