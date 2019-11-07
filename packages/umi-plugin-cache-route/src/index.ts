import path from 'path';
import fs from 'fs';
import update from './update';

const target = path.resolve('./node_modules/umi/lib/renderRoutes.js');
const source = path.resolve('./node_modules/umi-plugin-cache-route/renderRoutes.js');
const backups = path.resolve('./node_modules/umi-plugin-cache-route/backups/renderRoutes.js');

interface IOpts {
  keepalive: string[] | string;
}

function optsToArray(item) {
  if (!item) return [];
  if (Array.isArray(item)) {
    return item;
  } else {
    return [item];
  }
}

export default function (api, options: IOpts) {
  const sourceContent = fs.readFileSync(source, 'utf-8');
  const targetContent = fs.readFileSync(target, 'utf-8');
  if (targetContent.indexOf('react-router-cache-route') === -1) {
    console.log('Overwrite:node_modules/umi/lib/renderRoutes.js');
    fs.writeFileSync(
      backups,
      targetContent,
    );
    fs.writeFileSync(
      target,
      sourceContent,
    );
    console.log('Overwrite Success!');
  }
  // keep alive init
  api.registerCommand(
    'keepalive',
    {
      description: 'keep alive init,user --backups=true backups the change files',
    },
    args => {
      if (args.backups) {
        const backupsContent = fs.readFileSync(backups, 'utf-8');
        fs.writeFileSync(
          target,
          backupsContent,
        );
        console.log('Backups Success!');
      } else {
        console.log('When "dev", the overwrite file is automatically executed, and you can restore it through "keepalive --backups=true"');
      }
    },
  );
  api.onOptionChange(newOpts => {
    options = newOpts;
    api.rebuildTmpFiles();
  });

  if (!options.keepalive) {
    return
  }

  api.modifyRoutes(routes => {
    routes = update(routes, optsToArray(options.keepalive));
    return routes;
  });

  // import { dropByCacheKey } from 'react-router-cache-route';
  api.addUmiExports([
    {
      specifiers: ['dropByCacheKey'],
      source: 'react-router-cache-route',
    },
  ]);
}

