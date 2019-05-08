import * as React from 'react';

declare const QrcodeTypes: (opts: {
    value: string;
    renderAs: 'canvas' | 'svg',
    size: number,
    bgColor: string,
    fgColor: string,
    level: 'L' | 'M' | 'Q' | 'H',
    includeMargin: boolean,
}) => React.Component;

export default QrcodeTypes;
