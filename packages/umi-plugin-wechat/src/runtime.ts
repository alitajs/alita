export function render(oldRender) {
  const wechatConfig = (window as any).g_plugins.mergeConfig('wechatConfig') || {};
  (window as any).wx.config(wechatConfig);
  (window as any).wx.ready(function () {
    // Wechat JS-SDK加载完成之后再启动应用
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    oldRender();
  });
  (window as any).wx.error(function () {
    // Wechat JS-SDK加载完成之后再启动应用
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    oldRender();
    if (wechatConfig.error && typeof wechatConfig.error === 'function') {
      wechatConfig.error();
    }
  });
}
