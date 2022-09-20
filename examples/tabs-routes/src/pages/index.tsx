import { history } from 'alita';
import { Button } from 'antd';

export default () => (
  <Button
    type={'link'}
    onClick={() => {
      history.push('/users');
    }}
  >
    Hello Alita
  </Button>
);
