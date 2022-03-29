// Fix document undefined when ssr. #2571
if (typeof document !== 'undefined') {
  const win = window as any;
  const baseFontSize = win.alitaBaseFontSize ||100;
  const psdWidth = win.alitaPsdWidth || 750;
  const _baseFontSize = baseFontSize || 100;
  const _psdWidth = psdWidth || 750;

  const doc = win.document;
  const docEl = doc.documentElement;

  let lastWidth = docEl.clientWidth;
  let lastHeight = docEl.clientHeight;

  // 为了消除安卓dpr乱标的比例
  let rate = 1;
  // 非淘宝高清方案，默认的 initial-scale 为 1
  let scale = 1;

  // 部分安卓机，需要延迟获取屏幕转向和宽高
  let timeoutNum: any;
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
    // 多次触发 resize 的情况，比如转动屏幕，有些手机会改变两次，有些只有一次
    if (timeoutNum) clearTimeout(timeoutNum);
    // 部分安卓机，转屏幕时直接获取 clientHeight 值异常
    timeoutNum = setTimeout(() => {
      const currentWidth = docEl.clientWidth;
      const currentHeight = docEl.clientHeight;

      // 如果只有高度变化了，认为是键盘弹起事件，不做fontsize计算
      if (currentWidth === lastWidth && currentHeight !== lastHeight) {
        lastWidth = currentWidth;
        lastHeight = currentHeight;
        return;
      }

      lastWidth = currentWidth;
      lastHeight = currentHeight;

      const trueClient =
        currentHeight > currentWidth ? currentWidth : currentHeight;

      const newFontSize = `${
        (_baseFontSize / _psdWidth) * trueClient * rate
      }px`;
      // 如果计算值和当前值相同，不需要重新设置
      if (newFontSize === docEl.style.fontSize) return;
      docEl.style.fontSize = newFontSize;
    }, 300);
  };
  // 延迟执行会导致，首次页面闪屏，直接设置
  // setFontSize();
  const trueClient =
    docEl.clientHeight > docEl.clientWidth
      ? docEl.clientWidth
      : docEl.clientHeight;
  const newFontSize = `${(_baseFontSize / _psdWidth) * trueClient * rate}px`;
  docEl.style.fontSize = newFontSize;

  win.addEventListener('resize', setFontSize);

  // hd solution for antd-mobile@2
  // ref: https://mobile.ant.design/docs/react/upgrade-notes-cn#%E9%AB%98%E6%B8%85%E6%96%B9%E6%A1%88
  // @ts-ignore
  document.documentElement.setAttribute('data-scale', true);
}
