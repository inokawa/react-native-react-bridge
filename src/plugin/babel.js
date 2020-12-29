import { parseSync, transformSync } from "@babel/core";
import traverse from "@babel/traverse";

export const isEntryFile = (src, filename) => {
  const ast = parseSync(src, { filename });
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
        })
      ) {
        isEntry = true;
      }
    },
  });
  return isEntry;
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === "function") {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
