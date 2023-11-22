import { IApi } from 'umi';
import { dirname } from 'path';
import OpenAI from 'openai';

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
          })
          .partial();
      },
    },
  });
  api.registerMethod({ name: 'onIntlAzure' });

  // only dev
  if (!['dev', 'setup'].includes(api.name)) return;

  api.onStart(async () => {
    const {
      resource,
      model = 'gpt-4',
      apiVersion = '2023-08-01-preview',
    } = api.config.azure;
    const apiKey = process.env['AZURE_OPENAI_API_KEY'];
    const openai = new OpenAI({
      apiKey,
      baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
      defaultQuery: { 'api-version': apiVersion },
      defaultHeaders: { 'api-key': apiKey },
    });
    await api.applyPlugins({
      key: 'onIntlAzure',
      type: api.ApplyPluginsType.event,
      args: {
        openai,
        send: async (
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
        },
      },
    });
  });
  api.modifyDefaultConfig((memo: any) => {
    const apiKey = process.env['AZURE_OPENAI_API_KEY'];
    if (!apiKey) {
      throw new Error(
        'The AZURE_OPENAI_API_KEY environment variable is missing or empty.',
      );
    }

    memo.define = {
      'process.env.AZURE_OPENAI_API_KEY': apiKey,
      ...memo.define,
    };
    return memo;
  });
  // 生成临时文件
  api.onGenerateFiles({
    fn() {
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
};
