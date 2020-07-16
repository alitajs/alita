export default (
  keepalive: (string | RegExp)[],
  path: string,
) => `import React from 'react';

const KeepAliveLayout = (props:any) => {
  return React.createElement(require('${path}').default, {
    keepalive:[${keepalive}],
    ...props
  })
}
export {KeepAliveLayout}
`;
