export default (keepalive: [], path: string) => `import React from 'react';

const KeepAliveLayout = (props:any) => {
  return React.createElement(require('${path}').default, {
    keepalive:${JSON.stringify(keepalive)},
    ...props
  })
}
export {KeepAliveLayout}
`;
