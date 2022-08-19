import { address } from '@umijs/utils';
import qrCodeTerminal from 'qrcode-terminal';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.onDevCompileDone(async ({ isFirstCompile }) => {
    if (api.userConfig.appType === 'pc') return;
    if (!isFirstCompile) return;
    const port = api.appData.port || 8000;
    const isHTTPS = process.env.HTTPS || api.args?.https;
    const lanIp = address.ip();
    const protocol = isHTTPS ? 'https' : 'http';
    const lanUrl = `${protocol}://${lanIp}:${port}`;
    if (lanUrl) {
      // TODO: 微应用或者有调试 app 的时候，可以通过这里向主项目传值
      // const qrCode = await api.applyPlugins({
      //   key: 'modifyQrCodeData',
      //   initialValue: {
      //     type: 'dev',
      //     url: lanUrl,
      //   },
      // });
      qrCodeTerminal.generate(lanUrl, {
        small: true,
      });
    }
  });
};
