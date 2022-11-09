import React from 'react';

export default (props) => {
  console.log(props);
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
