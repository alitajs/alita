import React from 'react';

const Demo = ({ data }: any) => (
  <div>
    <div>{Math.random()}</div>
    {JSON.stringify(data)}
  </div>
);
const Count = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      {count}
      <div>{Math.random()}</div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click Me!
      </button>
    </div>
  );
};
const Provider = (props: any) => <div>{props.children}</div>;
export default () => {
  const [data, setData] = React.useState({ name: 'foo' });
  return (
    <div>
      <Provider>
        <Demo data={data} />
      </Provider>
      <Count />
    </div>
  );
};
