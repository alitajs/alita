// 安装使用 @umijs/plugin-dva
// 运行时提示找不到 utils
// 所以先把文件拷贝来用
import { utils } from 'umi';
import { readFileSync } from 'fs';
import { join } from 'path';

export function getModels(opts: { base: string; pattern?: string }) {
  return utils.glob
    .sync(opts.pattern || '**/*.{ts,tsx,js,jsx}', {
      cwd: opts.base,
    })
    .filter(f => {
      if (/\.d.ts$/.test(f)) return false;
      if (/\.(test|spec).(j|t)sx?$/.test(f)) return false;
      // TODO: fs cache for performance
      return isValidModel({
        content: readFileSync(join(opts.base, f), 'utf-8'),
      });
    });
}

function getIdentifierDeclaration(
  node: utils.traverse.Node,
  path: utils.traverse.NodePath,
) {
  if (utils.t.isIdentifier(node) && path.scope.hasBinding(node.name)) {
    let bindingNode = path.scope.getBinding(node.name)!.path.node;
    if (utils.t.isVariableDeclarator(bindingNode)) {
      bindingNode = bindingNode.init!;
    }
    return bindingNode;
  }
  return node;
}

export function isValidModel({ content }: { content: string }) {
  const { parser } = utils;
  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  let isDvaModel = false;

  // TODO: 补充更多用例
  // 1. typescript 用法
  // 2. dva-model-extend 用法
  utils.traverse.default(ast as any, {
    ExportDefaultDeclaration(path: utils.traverse.NodePath) {
      const { node } = path as { node: utils.t.ExportDefaultDeclaration };
      const target = getIdentifierDeclaration(node.declaration, path);

      if (
        utils.t.isObjectExpression(target) &&
        target.properties.some(property => {
          return [
            'state',
            'reducers',
            'subscriptions',
            'effects',
            'namespace',
          ].includes((property as any).key.name);
        })
      ) {
        isDvaModel = true;
      }
    },
  });

  return isDvaModel;
}
