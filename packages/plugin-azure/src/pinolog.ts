import fs from 'fs';
import readline from 'readline';
import stream from 'stream';

export const getPinoLogByLevel = async (
  lever: number,
  path: string,
): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    // 创建读取和写入的streams
    const instream = fs.createReadStream(path);
    const outstream = new stream();
    // @ts-ignore
    const rl = readline.createInterface(instream, outstream);

    let errorLogs: any[] = [];

    rl.on('line', function (line) {
      // 将每一行转换成 JSON 对象
      let logObject = JSON.parse(line);

      // 检查日志等级是否为 'error'
      if (logObject.level === lever) {
        errorLogs.push(logObject);
      }
    });

    rl.on('close', function () {
      resolve(errorLogs);
    });
    rl.on('error', (e) => {
      console.error('读取日志文件错误', path);
      reject(e);
    });
  });
};
