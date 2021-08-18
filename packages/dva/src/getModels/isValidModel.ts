import { utils } from 'umi';

const { t, traverse, parser } = utils;

function getIdentifierDeclaration(
  node: utils.traverse.Node,
  path: utils.traverse.NodePath,
) {
  if (t.isIdentifier(node) && path.scope.hasBinding(node.name)) {
    let bindingNode = path.scope.getBinding(node.name)!.path.node;
    if (t.isVariableDeclarator(bindingNode)) {
      bindingNode = bindingNode.init!;
    }
    return bindingNode;
  }
  return node;
}

function getTSNode(node: any) {
  if (
    // <Model> {}
    t.isTSTypeAssertion(node) ||
    // {} as Model
    t.isTSAsExpression(node)
  ) {
    return node.expression;
  } else {
    return node;
  }
}

export function isValidModel({ content }: { content: string }) {
  const { parser } = utils;
  const ast = parser.parse(content, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'classProperties',
      'dynamicImport',
      'exportDefaultFrom',
      'exportNamespaceFrom',
      'functionBind',
      'nullishCoalescingOperator',
      'objectRestSpread',
      'optionalChaining',
      'decorators-legacy',
    ],
  });

  let isDvaModel = false;
  let imports = {};

  traverse.default(ast as any, {
    ImportDeclaration(path) {
      const { specifiers, source } = path.node;
      specifiers.forEach((specifier) => {
        if (t.isImportDefaultSpecifier(specifier)) {
          imports[specifier.local.name] = source.value;
        }
      });
    },
    ExportDefaultDeclaration(path: utils.traverse.NodePath) {
      let node = (path as { node: utils.t.ExportDefaultDeclaration }).node
        .declaration;

      node = getTSNode(node);
      node = getIdentifierDeclaration(node, path);
      node = getTSNode(node);

      // 支持 dva-model-extend
      if (
        t.isCallExpression(node) &&
        t.isIdentifier(node.callee) &&
        imports[node.callee.name] === 'dva-model-extend'
      ) {
        node = node.arguments[1];

        node = getTSNode(node);
        node = getIdentifierDeclaration(node, path);
        node = getTSNode(node);
      }

      if (
        t.isObjectExpression(node) &&
        node.properties.some((property) => {
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
