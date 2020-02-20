declare module 'postcss-plugin-px2rem' {
  export interface IOpts {
    rootValue: number;
    unitPrecision: number;
    propWhiteList: any[];
    propBlackList: any[];
    exclude: boolean;
    selectorBlackList: any[];
    ignoreIdentifier: boolean;
    replace: boolean;
    mediaQuery: boolean;
    minPixelValue: number;
  }

  export default function px2rem(opts: IOpts): any;
}
