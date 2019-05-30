import * as React from 'react';

export interface QrcodeTypes {
    value: string;
    renderAs?: 'canvas' | 'svg',
    size?: number,
    bgColor?: string,
    fgColor?: string,
    level?: 'L' | 'M' | 'Q' | 'H',
    includeMargin?: boolean,
  }

  export default class Qrcode extends React.Component<QrcodeTypes, any> {}
