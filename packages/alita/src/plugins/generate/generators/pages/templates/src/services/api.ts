import { request } from 'alita';

export async function query()<% if (isTypeScript) { %>: Promise<any><% } %> {
  return request('/api/hello');
}
