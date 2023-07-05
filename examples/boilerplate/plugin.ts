import { join } from 'path';
import { IApi } from 'umi';

export default (api: IApi) => {
  api.addLayouts(() => {
    return [
      {
        id: 'custom-layout',
        // 这里写路径，现在是 src/component/layout
        // import React from 'react';
        // const Layout = ({ children }) => {
        ///   return <div>123{children}</div>;
        /// };
        /// export default Layout;
        file: join(api.paths.absSrcPath, 'layouts/layout'),
      },
    ];
  });
};
