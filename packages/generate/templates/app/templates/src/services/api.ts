import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello', { method: "POST" });
}

export async function queryList(data: any): Promise<any> {
  return request('/api/list', { method: "POST", data });
}
