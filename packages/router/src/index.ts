import { IApi, utils } from 'umi';
import { join } from 'path';
import getContent from './utils/getContent';

const DIR_NAME = 'umi-router';
const MODEL_NAME = 'router';
const RELATIVE_MODEL = join(DIR_NAME, MODEL_NAME);
const RELATIVE_MODEL_PATH = `${RELATIVE_MODEL}.ts`;

export default (api: IApi) => {

  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: RELATIVE_MODEL_PATH,
      content: getContent(),
    });
  });

  api.addUmiExports(() => [
    {
      exportAll: true,
      source: `../${RELATIVE_MODEL}`,
    },
  ]);
};
