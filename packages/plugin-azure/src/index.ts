import { IApi } from 'umi';
import { dirname, join } from 'path';
import { logger, winPath } from '@umijs/utils';
import OpenAI from 'openai';
import { getPinoLogByLevel } from './pinolog';

export enum GeneratorType {
  generate = 'generate',
  enable = 'enable',
}

export interface IEvent<T> {
  (fn: { (args: T): void }): void;
  (args: {
    fn: {
      (args: T): void;
    };
    name?: string;
    before?: string | string[];
    stage?: number;
  }): void;
}
export declare type IAzureSend = (
  content: string | Array<OpenAI.ChatCompletionMessageParam>,
) => Promise<OpenAI.Chat.Completions.ChatCompletion>;
export declare type IOnIntlAzure = IEvent<{
  openai: OpenAI;
  send: IAzureSend;
}>;
let sendAi: IAzureSend;

const errorMessage =
  '环境变量 AZURE_OPENAI_API_KEY 不存在，无法使用 AIGC 相关的功能，建议在 .env.local 文件中添加它';
export default (api: IApi) => {
  api.describe({
    key: 'azure',
    config: {
      schema({ zod }) {
        return zod
          .object({
            // key 只能从环境变量传递，减少 key 暴露风险
            // apiKey: zod.string(),
            apiVersion: zod.string(),
            model: zod.string(),
            resource: zod.string(),
            whyQuestion: zod.string(),
          })
          .partial();
      },
      default: {
        apiVersion: '2023-07-01-preview',
        model: 'alita4',
        resource: 'alita',
      },
    },
  });
  api.registerMethod({ name: 'onIntlAzure' });
  const apiKey = process.env['AZURE_OPENAI_API_KEY'];

  api.onStart(async () => {
    if (!apiKey) {
      await api.applyPlugins({
        key: 'onIntlAzure',
        type: api.ApplyPluginsType.event,
        args: {
          openai: {},
          send: async () => {
            logger.error(errorMessage);
            return {};
          },
        },
      });
      return;
    }
    const {
      resource,
      model = 'gpt-4',
      apiVersion = '2023-08-01-preview',
    } = api.config.azure;
    const openai = new OpenAI({
      apiKey,
      baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
      defaultQuery: { 'api-version': apiVersion },
      defaultHeaders: { 'api-key': apiKey },
    });
    sendAi = async (
      content: string | Array<OpenAI.ChatCompletionMessageParam>,
    ): Promise<OpenAI.Chat.Completions.ChatCompletion> => {
      let message: Array<OpenAI.ChatCompletionMessageParam> = [];
      if (typeof content === 'string') {
        message = [
          {
            role: 'user',
            content,
          },
        ];
      }
      logger.info(JSON.stringify(message));
      const result = await openai.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: `||>instructions:\你是一位高级软件工程师，你精通各种语言和方案\n||>assistant:\n`,
          },
          ...message,
        ],
      });
      return result;
    };
    await api.applyPlugins({
      key: 'onIntlAzure',
      type: api.ApplyPluginsType.event,
      args: {
        openai,
        send: sendAi,
      },
    });
  });
  api.modifyDefaultConfig((memo: any) => {
    if (apiKey) {
      memo.define = {
        'process.env.AZURE_OPENAI_API_KEY': apiKey,
        ...memo.define,
      };
    }
    return memo;
  });
  // 生成临时文件
  api.onGenerateFiles({
    fn() {
      if (!apiKey) {
        api.writeTmpFile({
          path: 'index.tsx',
          content: `
              export const openai = {} as any;
              
              export const sendOpenAI = async (content: string | Array<OpenAI.ChatCompletionMessageParam>):Promise<any> => {
                  console.error('${errorMessage}');
                  // result.choices[0]!.message?.content
                  // 兜底
                  return {choices:[{message:{content:'${errorMessage}'}}]};
              }`,
        });
        return;
      }
      const openaiPath = dirname(require.resolve('openai'));
      const {
        resource,
        model = 'gpt-4',
        apiVersion = '2023-08-01-preview',
      } = api.config.azure;
      api.writeTmpFile({
        path: 'index.tsx',
        content: `
            import OpenAI from '${openaiPath}';

            const resource = '${resource}';
            const model = '${model}';
            const apiVersion = '${apiVersion}';
            const apiKey = process.env.AZURE_OPENAI_API_KEY;
            export const openai = new OpenAI({
                apiKey,
                baseURL: \`https://\${resource}.openai.azure.com/openai/deployments/\${model}\`,
                defaultQuery: { 'api-version': apiVersion },
                defaultHeaders: { 'api-key': apiKey },
                dangerouslyAllowBrowser: true,
            });
            
            export const sendOpenAI = async (content: string | Array<OpenAI.ChatCompletionMessageParam>):Promise<OpenAI.Chat.Completions.ChatCompletion> => {
                let message: Array<OpenAI.ChatCompletionMessageParam> = [];
                if (typeof content === 'string') {
                    message = [{
                        role: 'user', content
                    }]
                }
                const result = await openai.chat.completions.create({
                    model,
                    messages: [{
                        role: "system",
                        content:
                        \`||>instructions:\你是一位高级软件工程师，你精通各种语言和方案\n||>assistant:\n\`,
                    },
                    ...message],
                });
                return result;
            }`,
      });
    },
  });

  api.registerCommand({
    name: 'call',
    description: 'AIGC 问答',
    fn: async ({ args }) => {
      if (!apiKey) {
        logger.error(errorMessage);
        return;
      }
      const name = args?._?.[0] ?? args?._?.[0];
      const result = await sendAi(name);
      const content = result.choices[0]!.message?.content || '{}';
      if (content) {
        logger.info(content);
      }
    },
  });

  api.registerCommand({
    name: 'why',
    description: '当服务异常退出时，可以使用 why 命令，尝试查询一下原因',
    fn: async ({}) => {
      if (!apiKey) {
        logger.error(errorMessage);
        return;
      }
      const errorLog: any[] = await getPinoLogByLevel(
        50,
        winPath(
          join(api.paths.absNodeModulesPath, '.cache', 'logger', 'umi.log'),
        ),
      );
      if (errorLog.length > 0) {
        const {
          whyQuestion = '我在使用 umi 系列框架的时候，遇到这个问题，服务挂了，请帮我分析一下可能的原因，并提供可能的修复方式，日志如下',
        } = api.config.azure;
        const result = await sendAi(
          `${whyQuestion}${JSON.stringify(errorLog.pop())}`,
        );
        const content = result.choices[0]!.message?.content || '{}';
        if (content) {
          console.log(content);
        }
      }
    },
  });
};
