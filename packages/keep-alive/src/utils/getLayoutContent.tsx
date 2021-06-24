export default (
  keepalive: (string | RegExp)[],
  path: string,
) => `import React from 'react';
import Layout from '${path}';

const KeepAliveLayout = (props:any) => {
  return React.createElement(Layout, {
    keepalive:[${keepalive}],
    ...props
  })
}
export {KeepAliveLayout}
`;
