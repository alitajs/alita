/**
 * 像素转换
 * @param {Number} px - 750视觉稿像素
 * @return {Number} 屏幕上实际像素
 */
export default function px2hd(px: number): number {
  const ONE_REM =
    parseInt(document.documentElement.style.fontSize || '100', 10) || 100;
  const SCALE = ONE_REM / 100;
  return Number((px * SCALE).toFixed(1));
}
