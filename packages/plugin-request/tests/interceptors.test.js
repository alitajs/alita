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
      errorConfig: {
        errorPage: '/custom/errorPage',
      },
      middlewares: [
        async (ctx, next) => {
          await next();
          const { res } = ctx;
          res.data.testMiddlewares = 'middlewares works';
        },
      ],
      requestInterceptors: [
        (url, options) => {
          return {
            url,
            options: {
              text: 'requestInterceptors',
              ...options,
            },
          };
        },
      ],
      responseInterceptors: [
        (response, options) => {
          response.interceptors = options.text;
          return response;
        },
      ],
    };
  },
  { virtual: true },
);

describe('interceptors', () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(() => {
    server.close();
  });

  const prefix = (api) => `${server.url}${api}`;

  test('normal', async () => {
    const rawData = {
      success: true,
      errorMessage: 'test message',
      errorCode: '505',
      showType: 9,
      data: {
        text: 'hi',
      },
    };
    server.get('/test/skip', (req, res) => {
      res.send(rawData);
    });
    const response = await request(prefix('/test/skip'), {
      getResponse: true,
    });
    expect(response.data).toEqual({
      ...rawData,
      testMiddlewares: 'middlewares works',
    });
    expect(response.response.interceptors).toEqual('requestInterceptors');
  });
});
