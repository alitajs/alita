import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello');
}

export async function queryList(data: any): Promise<any> {
  console.log(1232131221312);
  console.log(data);
  return request('/api/list', { data });
}
