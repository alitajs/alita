import { readdirSync } from 'fs';

export default function (api) {
  readdirSync(`${__dirname}/generators`)
    .filter(f => !f.startsWith('.'))
    .forEach(f => {
      api.registerGenerator(f, {
        Generator: require(`./generators/${f}`).default(api),
        resolved: `${__dirname}/generators/${f}/index`,
      });
    });
}
