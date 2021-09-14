/**
 * @jest-environment node
 */
import createTestServer from './createTestServer';
import { request } from '../src/request';

jest.mock('umi', () => require('./mocks/umi'));
// jest.mock('antd', () => require('./mocks/antd'));

jest.mock(
  'runtimeConfig',
  () => {
    return {
      errorConfig: {
        errorPage: '/custom/errorPage',
      },
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

jest.mock('@umijs/plugin-request/lib/ui', () => {
  // mock antd throw error for test
  return {
    message: {
      warn: () => {
        throw new Error('message.warn');
      },
      error: () => {
        throw new Error('message.error');
      },
    },
    notification: {
      open: () => {
        throw new Error('notification.open');
      },
    },
  };
});

jest.mock(
  'historyPush',
  () => {
    return ({ pathname, query }) => {
      throw new Error(
        `${pathname}?errorCode=${query.errorCode}&errorMessage=${query.errorMessage}`,
      );
    };
  },
  { virtual: true },
);

describe('antd error tip', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = (api) => `${server.url}${api}`;

  test('antd message warn', async () => {
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
      expect(e.message).toEqual('message.warn');
    }
  });

  test('antd message warn', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      showType: 2,
    };
    server.get('/test/failed2', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed2'));
    } catch (e) {
      expect(e.message).toEqual('message.error');
    }
  });

  test('silent', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      showType: 0,
    };
    server.get('/test/failed0', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed0'));
    } catch (e) {
      expect(e.message).toEqual('test message');
    }
  });

  test('notification', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      showType: 4,
    };
    server.get('/test/failed4', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed4'));
    } catch (e) {
      expect(e.message).toEqual('notification.open');
    }
  });

  test('redirect', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      errorCode: '505',
      showType: 9,
    };
    server.get('/test/failed9', (req, res) => {
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/failed9'));
    } catch (e) {
      expect(e.message).toEqual(
        '/custom/errorPage?errorCode=505&errorMessage=test message',
      );
    }
  });

  test('skipErrorHandler', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      errorCode: '505',
      showType: 9,
    };
    server.get('/test/skip', (req, res) => {
      res.send(rawData);
    });
    const response = await request(prefix('/test/skip'), {
      skipErrorHandler: true,
    });
    expect(response).toEqual({
      ...rawData,
      testMiddlewares: 'middlewares works',
    });
  });

  test('skipErrorHandler when http error', async () => {
    const rawData = {
      success: false,
      errorMessage: 'test message',
      errorCode: '505',
      showType: 1,
    };
    server.get('/test/skip', (req, res) => {
      res.status(500);
      res.send(rawData);
    });
    try {
      const response = await request(prefix('/test/skip'), {
        skipErrorHandler: true,
      });
    } catch (e) {
      expect(e.name).toEqual('ResponseError');
      expect(e.message).toEqual('http error');
    }
  });
});
