// @ts-ignore
import { history } from '@@/core/history';

export function push(...args) {
  history.push(...args);
}

export function replace(...args) {
  history.replace(...args);
}

export function go(...args) {
  history.go(...args);
}

export function goBack(...args) {
  history.goBack(...args);
}

export function goForward(...args) {
  history.goForward(...args);
}

const router = {
  push,
  replace,
  go,
  goBack,
  goForward,
};

export { router };
