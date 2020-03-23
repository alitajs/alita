import { request } from 'alita';

export async function query(): Promise<any> {
  return request('/api/hello');
}

export async function queryMenu(): Promise<any> {
  return request('/api/menu');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}
