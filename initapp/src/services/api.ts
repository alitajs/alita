import request from 'alita-request';

export async function query(): Promise<any> {
  return request('/api/hello');
}
