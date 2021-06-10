// Fix document undefined when ssr. #2571
if (typeof document !== 'undefined') {
  const getViewPort = (str?: string) => {
    if (!str) return {};
    const arr = str.split(',');
    const hashArr = {};
    arr.forEach((s) => {
      const ss = s.split('=');
      hashArr[ss[0].replace(/(^\s*)|(\s*$)/g, '')] = ss[1];
    });
    return hashArr;
  };

  // 自动处理页面使用 iframe 嵌套缩放问题
  if (window != top && !(window as any).alitaFontScale) {
    // window.alitaFontScale = 0.5;
    const meta = document.querySelector('meta[name="viewport"]');
    const metaStr = meta?.getAttribute('content') || '';
    const viewport = getViewPort(metaStr);
    if (viewport['initial-scale']) {
      const dpr = window.devicePixelRatio || 1;
      // 现在 initial-scale 默认是1，所以当父级也是1的时候，缩放比要保证为1
      const baseScale = 40 / dpr;
      (window as any).alitaFontScale =
        baseScale /
        parseInt(`${parseFloat(viewport['initial-scale']) * 10}`, 10);
    }
  }
  const _baseFontSize = 100;
  const scale = (window as any).alitaFontScale || 1;
  const win = window;
  const doc = win.document;
  const ua = navigator.userAgent;
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
  const isUCHd =
    UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  let dpr = win.devicePixelRatio || 1;
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1;
  }

  var metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  metaEl.setAttribute(
    'content',
    'width=device-width,user-scalable=no,initial-scale=' +
      scale +
      ',maximum-scale=' +
      scale +
      ',minimum-scale=' +
      scale +
      ',viewport-fit=cover',
  );

  doc.documentElement.style.fontSize = (_baseFontSize / 4) * dpr * scale + 'px';

  // if (document.documentElement.clientWidth >= 750) {
  //   vw(100, 750);
  // } else {
  //   flex(100, window.alitaFontScale || 1);
  // }
  // 感觉全部用 flex 就很棒，嵌套页面缩放问题，直接设置 alitaFontScale
  // 大屏手机适配疑似存在问题。
  // flex(100, window.alitaFontScale || 1);
  // hd solution for antd-mobile@2
  // ref: https://mobile.ant.design/docs/react/upgrade-notes-cn#%E9%AB%98%E6%B8%85%E6%96%B9%E6%A1%88
  document.documentElement.setAttribute('data-scale', true);
}
