import path from 'path';
import fs from 'fs';
import update from './update';

const target = path.resolve('../../node_modules/umi/lib/renderRoutes.js');
const source = path.resolve('../renderRoutes.js');

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

  // keep alive init
  api.registerCommand(
    'keepalive',
    {
      description: 'keep alive init',
    },
    args => {
      const sourceContent = fs.readFileSync(source, 'utf-8');
      const targetContent = fs.readFileSync(target, 'utf-8');
      if (targetContent.indexOf('react-router-cache-route') === -1) {
        console.log('Overwrite:node_modules/umi/lib/renderRoutes.js');
        fs.writeFileSync(
          target,
          sourceContent,
        );
        console.log('Overwrite Success!');
      } else {
        console.log('No more initialization required!');
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

