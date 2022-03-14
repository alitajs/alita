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
const Header: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, ...reset }) => {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 9,
        display: 'block',
        order: '-1',
        width: '100%',
      }}
      {...reset}
    >
      {children}
    </div>
  );
};

export default Header;
