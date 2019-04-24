import request from 'alita-request';

export async function query()<% if (isTypeScript) { %>: Promise<any><% } %> {
  return request('/api/hello');
}
