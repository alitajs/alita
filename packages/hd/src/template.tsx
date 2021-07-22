// Fix document undefined when ssr. #2571
if (typeof document !== 'undefined') {
  const win = window;
  const baseFontSize = 100;
  const psdWidth = 750;
  const _baseFontSize = baseFontSize || 100;
  const _psdWidth = psdWidth || 750;

  const doc = win.document;
  const docEl = doc.documentElement;
  let clientHeight = docEl.clientHeight;

  // 为了消除安卓dpr乱标的比例
  let rate = 1;
  // 非淘宝高清方案，默认的 initial-scale 为 1
  let scale = 1;

  // 有些兼容环境下, fontSize为100px的时候, 结果1rem=86px; 需要纠正viewport;
  docEl.style.fontSize = `${_baseFontSize}px`;
  const div = doc.createElement('div');
  div.setAttribute('style', 'width: 1rem;display:none');
  docEl.appendChild(div);
  const trueWidth = win.getComputedStyle(div).width;
  docEl.removeChild(div);
  // 如果1rem的真实px跟html.fontSize不符. 那么就要加一个rate缩放了;
  if (trueWidth !== docEl.style.fontSize) {
    const trueWidthVal = parseInt(trueWidth, 10);
    rate = _baseFontSize / trueWidthVal;
    scale = scale * rate;
  }
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
  let metaEl = doc.querySelector('meta[name="viewport"]');
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    doc.head.appendChild(metaEl);
  }
  // 如果是在 iframe 中打开
  if (window != top) {
    const metaStr = metaEl?.getAttribute('content') || '';
    const viewport = getViewPort(metaStr);
    const initScale = viewport['initial-scale'] || '1.0';
    // 把 initial-scale 换成两位数的整数，便于计算。
    const initScaleNum = parseInt(`${parseFloat(initScale) * 10}`, 10);
    scale = initScaleNum / 10;
  }
  metaEl.setAttribute(
    'content',
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},viewport-fit=cover`,
  );

  // width/750*100, 为了统一rem为0.01rem = 1px
  const setFontSize = () => {
    if (window.orientation === 90 || window.orientation === -90) {
      // console.log("横屏");
      docEl.style.fontSize = `${
        (_baseFontSize / _psdWidth) * clientHeight * rate
      }px`;
    } else {
      docEl.style.fontSize = `${
        (_baseFontSize / _psdWidth) * docEl.clientWidth * rate
      }px`;
    }
  };
  setFontSize();
  // 先去掉，好像只有转屏的时候会触发大小变化
  // win.addEventListener('resize', setFontSize);
  win.addEventListener('orientationchange', setFontSize);

  // hd solution for antd-mobile@2
  // ref: https://mobile.ant.design/docs/react/upgrade-notes-cn#%E9%AB%98%E6%B8%85%E6%96%B9%E6%A1%88
  // @ts-ignore
  document.documentElement.setAttribute('data-scale', true);
}
