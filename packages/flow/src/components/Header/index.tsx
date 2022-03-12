import React from 'react';

/**
 * alita header
 *
 * ```typescript
 * <Page>
 *   <Header></Header>
 * </Page>
 * ```
 */
const Header: React.FC = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 9,
        display: 'block',
        order: '-1',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default Header;
