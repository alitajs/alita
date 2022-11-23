import { useIntl } from 'alita';

export default () => {
  const intl = useIntl();
  const msg = intl.formatMessage({
    id: 'welcome',
  });

  return <>{msg}</>;
};
