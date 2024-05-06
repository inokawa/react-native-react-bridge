import { parseSync } from "@babel/core";
import traverse from "@babel/traverse";

/**
 * @internal
 */
export const isEntryFile = (src: string, filename: string) => {
  // TODO try lighter approach
  const ast = parseSync(src, { filename })!;
  let isEntry = false;
  traverse(ast, {
    ExportDefaultDeclaration(path) {
      if (
        looksLike(path.node, {
          declaration: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "webViewRender",
            },
          },
        }) ||
        looksLike(path.node, {
          declaration: {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: "webViewCreateRoot",
            },
          },
        })
      ) {
        isEntry = true;
      }
    },
  });
  return isEntry;
};

function looksLike(a: any, b: any): boolean {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey as keyof typeof b];
      const aVal = a[bKey as keyof typeof b];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val: any): boolean {
  return val == null || /^[sbn]/.test(typeof val);
}
