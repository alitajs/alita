import vw from 'umi-hd/lib/vw';
import flex from 'umi-hd/lib/flex';

// Fix document undefined when ssr. #2571
if (typeof document !== 'undefined') {
  const getViewPort = (str?: string) => {
    if (!str) return {};
    const arr = str.split(',');
    const hashArr = {};
    arr.forEach(s => {
      const ss = s.split('=');
      hashArr[ss[0].replace(/(^\s*)|(\s*$)/g, "")] = ss[1];
    })
    return hashArr;
  }

  // 自动处理页面使用 iframe 嵌套缩放问题
  if (window != top && !window.alitaFontScale) {
    // window.alitaFontScale = 0.5;
    const meta = document.querySelector('meta[name="viewport"]');
    const metaStr = meta.getAttribute('content') || '';
    const viewport = getViewPort(metaStr);
    if (viewport['initial-scale']) {
      const dpr = window.devicePixelRatio || 1;
      const baseScale = 10 / dpr;
      window.alitaFontScale = baseScale / parseInt(`${parseFloat(viewport['initial-scale']) * 10}`, 10);
    }
  }
  // if (document.documentElement.clientWidth >= 750) {
  //   vw(100, 750);
  // } else {
  //   flex(100, window.alitaFontScale || 1);
  // }
  // 感觉全部用 flex 就很棒，嵌套页面缩放问题，直接设置 alitaFontScale
  flex(100, window.alitaFontScale || 1);
  // hd solution for antd-mobile@2
  // ref: https://mobile.ant.design/docs/react/upgrade-notes-cn#%E9%AB%98%E6%B8%85%E6%96%B9%E6%A1%88
  document.documentElement.setAttribute('data-scale', true);
}
