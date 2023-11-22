import { IApi } from 'umi';

let _send = (_: any) => {};
export default (api: IApi) => {
  // @ts-ignore
  // api.onIntlAzure(async({send})=>{
  //   _send = send;
  // })
  // api.onDevCompileDone(async()=>{
  //   const result = await _send('你好');
  //   console.log(result.choices[0]!.message?.content);
  // })
};
