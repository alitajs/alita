import React from 'react';

export default () => {
  return (
    <div
      a-class={[
        'foo',
        {
          bar: true,
          active: false,
        },
      ]}
    >
      Hello Alita
    </div>
  );
};
