import Qrcode from "qrcode.react";
// prop	type	default value
// value	string
// renderAs	string ('canvas' 'svg')	'canvas'
// size	number	128
// bgColor	string (CSS color)	"#FFFFFF"
// fgColor	string (CSS color)	"#000000"
// level	string ('L' 'M' 'Q' 'H')	'L'
// includeMargin	boolean	false
export default interface QrcodeTypes {
  value: string;
  renderAs: 'canvas' | 'svg',
  size: number,
  bgColor: string,
  fgColor: string,
  level: 'L' | 'M' | 'Q' | 'H',
  includeMargin: boolean,
}
export {
  Qrcode as QrcodeTypes
}
