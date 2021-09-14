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
      middlewares: [
        async (ctx, next) => {
          await next();
          const { res } = ctx;
          res.testMiddlewares = 'middlewares works';
        },
      ],
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
      success: true,
      data: {
        list: ['test'],
      },
      errorMessage: 'test message',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });
    const response = await request(prefix('/test/success'));
    expect(response).toEqual({
      ...rawData,
      testMiddlewares: 'middlewares works',
    });
  });

  test('with getResponse', async () => {
    const rawData = {
      success: true,
      data: {
        list: ['test'],
      },
      errorMessage: 'test message',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });
    const response = await request(prefix('/test/success'), {
      getResponse: true,
    });
    expect(response.data).toEqual(rawData);
  });

  test('failed', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      showType: 1,
    };
    server.get('/test/failed', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed'));
    } catch (e) {
      expect(e.name).toEqual('BizError');
      expect(e.message).toEqual('test message');
      expect(e.data).toEqual({
        ...rawData,
        testMiddlewares: 'middlewares works',
      });
    }
  });

  test('http failed', async () => {
    const rawData = {
      success: false,
      data: { list: [2] },
      errorMessage: 'test message',
    };
    server.get('/test/httpfailed', (req, res) => {
      res.status(500);
      res.send(rawData);
    });
    try {
      await request(prefix('/test/httpfailed'));
    } catch (e) {
      expect(e.name).toEqual('ResponseError');
      expect(e.message).toEqual('test message');
      expect(e.data).toEqual(rawData);
    }
  });
});
