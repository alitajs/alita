/**
 * @jest-environment node
 */
import { renderHook } from '@testing-library/react-hooks';
import { request, useRequest } from '../src/request';
import createTestServer from './createTestServer';

jest.mock('umi', () => require('./mocks/umi'));
jest.mock('@umijs/plugin-request/lib/ui', () => require('./mocks/antd'));

jest.mock(
  'runtimeConfig',
  () => {
    return {};
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
        text: 'testtext',
      },
      errorMessage: 'test message',
    };
    server.get('/test/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForValueToChange } = renderHook(() =>
      useRequest(prefix('/test/success')),
    );
    await waitForValueToChange(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });

  test('success with object', async () => {
    const rawData = {
      success: true,
      data: {
        text: 'testtext',
      },
      errorMessage: 'test message',
    };
    server.get('/test/object/success', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForValueToChange } = renderHook(() =>
      useRequest({
        url: prefix('/test/object/success'),
        method: 'GET',
      }),
    );
    await waitForValueToChange(() => result.current.data);
    expect(result.current.data).toEqual({
      text: 'testtext',
    });
  });
  test('failed with reqeust', async () => {
    const rawData = {
      success: false,
      data: {
        text: 'testtext',
      },
      errorMessage: 'test message',
    };
    server.get('/test/failed', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForValueToChange } = renderHook(() =>
      useRequest(() => {
        return request(prefix('/test/failed')).catch((e) => {
          return { data: e.message };
        });
      }),
    );
    await waitForValueToChange(() => result.current.data);
    expect(result.current.data).toEqual('test message');
  });

  // TODO brickspert
  test.skip('failed with url', async () => {
    const rawData = {
      success: false,
      data: {
        text: 'testtext',
      },
      errorMessage: 'test message',
    };
    server.get('/test/failedurl', (req, res) => {
      res.send(rawData);
    });

    const { result, waitForValueToChange } = renderHook(() =>
      useRequest(prefix('/test/failedurl')),
    );
    await waitForValueToChange(() => result.current.error);
    expect(result.current.error.message).toEqual('test message');
  });

  test.skip('http errorfailed with url', async () => {
    const rawData = {
      success: true,
      data: {
        text: 'testtext',
      },
      errorMessage: 'test message',
    };
    server.get('/test/httpfailed', (req, res) => {
      res.status(500);
      res.send(rawData);
    });

    const { result, waitForValueToChange } = renderHook(() =>
      useRequest(prefix('/test/httpfailed')),
    );
    await waitForValueToChange(() => result.current.error);
    expect(result.current.error.message).toEqual('test message');
  });
});
