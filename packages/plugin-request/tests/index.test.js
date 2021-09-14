/**
 * @jest-environment node
 */
import pluginFunc from '../src/index';

describe('plugin-request', () => {
  const getMockAPI = (writeTmpFile = () => {}, config) => {
    return {
      addRuntimePluginKey() {},
      onGenerateFiles(handler) {
        handler();
      },
      config: {
        request: config || {
          dataField: 'data',
        },
      },
      paths: {
        absTmpPath: '/test/page/.umi',
      },
      describe: () => {},
      utils: {
        winPath() {
          return '/winpathtest';
        },
      },
      chainWebpack() {},
      addUmiExports() {},
      addDepInfo() {},
      writeTmpFile,
    };
  };

  test('dataField', () => {
    const writeTmpFile = jest.fn();
    pluginFunc(
      getMockAPI(writeTmpFile, {
        dataField: 'result',
      }),
    );

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('result => result?.result'),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining("['result']"),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('result?: T;'),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('/winpathtest'),
    });
  });

  test('dataField format', () => {
    const writeTmpFile = jest.fn();
    pluginFunc(
      getMockAPI(writeTmpFile, {
        dataField: '',
      }),
    );
    expect(writeTmpFile).toHaveBeenCalled();

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining(
        'type ResultWithData<T = any> = {  [key: string]: any };',
      ),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('BaseOptions<R, P>'),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('BaseResult<R, P>'),
    });

    expect(writeTmpFile).toHaveBeenLastCalledWith({
      path: 'plugin-request/request.ts',
      content: expect.stringContaining('result => result'),
    });

    try {
      pluginFunc(
        getMockAPI(undefined, {
          dataField: '&12',
        }),
      );
    } catch (e) {
      expect(e.message).not.toBeNull();
    }
  });
});
