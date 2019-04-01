import { connect } from 'dva';
import { Button } from 'antd';
import styles from './index.css';

export default connect(state => {
  return { count: state.count };
})(function(props) {
  return (
    <div className={styles.normal}>
      <h1>Page index: {props.count}</h1>
      <Button
        type="primary"
        onClick={() => {
          props.dispatch({ type: 'count/add' });
        }}
      >
        Add Count
      </Button>
    </div>
  );
});
