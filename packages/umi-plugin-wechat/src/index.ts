// ref:
// - https://umijs.org/plugin/develop.html
import { join } from 'path';

interface WeChatConfig {
  isEnable :boolean;
}
export default function (api, options={} as WeChatConfig ) {
    console.log(options);
    if(options.isEnable){
      api.addRuntimePlugin(join(__dirname, './runtime'));
      api.addRuntimePluginKey('wechatConfig');
      api.addHTMLScript({
        src: 'http://res.wx.qq.com/open/js/jweixin-1.4.0.js',
      });
    }
}
