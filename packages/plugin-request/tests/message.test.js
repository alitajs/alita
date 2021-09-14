/**
 * @jest-environment node
 */
import createTestServer from './createTestServer';
import { request } from '../src/request';

jest.mock('umi', () => require('./mocks/umi'));

jest.mock(
  'runtimeConfig',
  () => {
    return {};
  },
  { virtual: true },
);

jest.mock('@umijs/plugin-request/lib/ui', () => {
  // mock antd throw error for test
  return {
    message: {
      error: (msg) => {
        throw new Error(msg);
      },
    },
  };
});

describe('request error message', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = (api) => `${server.url}${api}`;

  test('http failed without data', async () => {
    server.get('/test/httpfailed', (req, res) => {
      res.status(500);
      res.end();
    });
    try {
      await request(prefix('/test/httpfailed'));
    } catch (e) {
      expect(e.message).toEqual('http error');
    }
  });
});
