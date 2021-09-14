/**
 * @jest-environment node
 */
import createTestServer from './createTestServer';
import { request } from '../src/request';

jest.mock('umi', () => require('./mocks/umi'));
jest.mock('@umijs/plugin-request/lib/ui', () => require('./mocks/antd'));

jest.mock(
  'runtimeConfig',
  () => {
    return {
      timeout: 1001,
      errorConfig: {
        adaptor: (data, ctx) => {
          if (/ctx/.test(ctx?.req.url)) {
            throw new Error(ctx.req.options.timeout);
          }
          if (typeof data !== 'object') {
            return data;
          }
          return {
            ...data,
            errorMessage: data.message,
          };
        },
      },
    };
  },
  { virtual: true },
);

describe('normal request', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = (api) => `${server.url}${api}`;

  test('success', async () => {
    const rawData = {
      // success: true, default is success
      data: {
        list: ['test'],
      },
      message: 'test message',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });
    const response = await request(prefix('/test/success'));
    expect(response).toEqual(rawData);
  });

  test('failed', async () => {
    // failed
    const rawData = {
      success: false,
      message: 'test message',
    };
    server.get('/test/failed', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed'));
    } catch (e) {
      expect(e.name).toEqual('BizError');
      expect(e.message).toEqual('test message');
      expect(e.data).toEqual(rawData);
    }
  });

  test('http failed', async () => {
    // failed
    const rawData = {
      success: false,
      data: { list: [2] },
      message: 'test message',
    };
    server.get('/test/httpfailed', (req, res) => {
      res.status(500);
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/httpfailed'));
    } catch (e) {
      expect(e.name).toEqual('ResponseError');
      expect(e.message).toEqual('test message');
      expect(e.data).toEqual(rawData);
    }
  });

  test('not a json', async () => {
    server.get('/test/notjson', (req, res) => {
      res.send('ab&ddd12132');
    });
    const response = await request(prefix('/test/notjson'));
    expect(response).toEqual('ab&ddd12132');
  });

  test('ctx', async () => {
    server.get('/test/ctx', (req, res) => {
      res.send('ctx');
    });
    try {
      const response = await request(prefix('/test/ctx'));
    } catch (e) {
      expect(e.message).toEqual('1001');
    }
  });

  test('ctx when httperror', async () => {
    server.get('/test/ctx2', (req, res) => {
      res.status(404);
      res.send('ctx2');
    });
    try {
      const response = await request(prefix('/test/ctx2'));
    } catch (e) {
      expect(e.message).toEqual('1001');
    }
  });
});
