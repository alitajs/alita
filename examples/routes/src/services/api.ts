import { request } from '@@/plugin-request';

export async function query(): Promise<any> {
  return request('/hello');
}
