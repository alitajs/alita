import { useNavigate } from 'alita';
import { Button } from 'antd-mobile';
import styles from './index.css';

export default function ({}) {
  const navigate = useNavigate();
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <p className={styles.description}>
        To get started, edit <code>src/pages/index.js</code> and save to reload.
      </p>
      <Button
        size="large"
        color="primary"
        fill="solid"
        block
        onClick={() => navigate('/list')}
      >
        Go to List
      </Button>
    </div>
  );
}
