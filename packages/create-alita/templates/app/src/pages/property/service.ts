import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello', { method: 'post' });
}
