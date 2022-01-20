import React from 'react';

interface ShowProps {
  when: boolean;
  fallback?: React.ReactElement;
  children: React.ReactElement;
}

/**
 * Conditionally render its children or an optional fallback component
 */
const Show: React.FC<ShowProps> = (props) => {
  const { when, fallback = <></>, children } = props;
  if (when) return children;
  return fallback;
};

export default Show;
