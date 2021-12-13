import type { IAdd } from '@umijs/core';
import { IApi } from 'umi';

export type AlitaApi = IApi & {
  addUmiExports: IAdd<
    null,
    {
      source: string;
      specifiers?: (
        | string
        | {
            local: string;
            exported: string;
          }
      )[];
      exportAll?: boolean;
    }
  >;
};
