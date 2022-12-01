import { useModel } from 'alita';

export default () => {
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');
  return <>{JSON.stringify(initialState)}</>;
};
