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
      Hello DPage 这里应该打印出所有的 props，包含 abcProp，但得到 空 {`{}`}
      {JSON.stringify(props)}
    </div>
  );
};
