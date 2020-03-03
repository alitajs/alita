import { readdirSync } from 'fs';
import { IApi } from '@umijs/types';

export default function(api: IApi) {
  readdirSync(`${__dirname}/generators`)
    .filter(f => !f.startsWith('.'))
    .forEach(f => {
      api.registerGenerator({
        key: f,
        Generator: require(`./generators/${f}`).default(api),
      });
    });
}
