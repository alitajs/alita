import { IApi } from 'umi';
import type { IOnIntlAzure, IAzureSend } from '@alita/plugin-azure';

let _send: IAzureSend;
export default (api: IApi & { onIntlAzure: IOnIntlAzure }) => {
  // api.onIntlAzure(async ({ send }) => {
  //   _send = send;
  // });
  // api.onDevCompileDone(async () => {
  //   const result = await _send('你好');
  //   console.log(result.choices[0]!.message?.content);
  // });
};
