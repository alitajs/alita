import { address, chalk, logger } from '@umijs/utils';
import qrCodeTerminal from 'qrcode-terminal';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.onStart(() => {
    logger.info('qrcodeterminal');
  });

  api.onDevCompileDone(async ({ isFirstCompile }) => {
    if (!isFirstCompile) return;
    const port = process.env.PORT || 8000;
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
    // TODO: port 要去动态的 port
    logger.info(
      '这里有一个 bug 取不到动态的 port，所以先保证你运行的 dev 服务是在 8000 端口',
    );
    logger.event(`Network: ${chalk.cyan(lanUrl)}`);
  });
};
