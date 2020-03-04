export default (keepalive: [], path: string) => `import React from 'react';

export default (props) => {
  return React.createElement(require('${path}').default, {
    keepalive:${JSON.stringify(keepalive)},
    ...props
  })
}
`;
