export default () => `
import { history } from '../core/history';

const router = {
  push: history.push,
  replace: history.replace,
  go: history.go,
  goBack: history.goBack,
  goForward: history.goForward,
};

export { router }
`;
