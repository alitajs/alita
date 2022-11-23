import { FormattedMessage, getLocale, setLocale } from 'alita';
import A from './a';

const App = () => (
  <>
    <FormattedMessage id="welcome" />
    <A />
    <button
      onClick={() => {
        const locale = getLocale();
        setLocale(locale == 'zh-CN' ? 'en-US' : 'zh-CN', false);
      }}
    >
      点击切换语言
    </button>
  </>
);

export default App;
