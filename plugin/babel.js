const { parseSync, transformSync } = require("@babel/core");
const traverse = require("@babel/traverse").default;
const p = require("path");

export const extractEntryPaths = (src, filename) => {
  const ast = parseSync(src, { filename });
  const compPaths = [];
  traverse(ast, {
    CallExpression(path) {
      if (isBundleReact(path.node)) {
        const [source, ...args] = path.get("arguments");
        compPaths.push(source.node.value);
      }
    },
  });
  return compPaths;
};

export const replaceEntryPaths = (src, filename, compStrs) => {
  return transformSync(src, {
    filename,
    // babelrc: false,
    plugins: [
      {
        visitor: {
          CallExpression(path, { file: { opts: fileOpts } }) {
            if (isBundleReact(path.node)) {
              const [source, ...args] = path.get("arguments");
              path.replaceWithSourceString(compStrs[source.node.value]);
            }
          },
        },
      },
    ],
  });
};

function isBundleReact(node) {
  return (
    looksLike(node, {
      callee: {
        type: "Identifier",
        name: "bundleReact",
      },
    }) ||
    looksLike(node, {
      callee: {
        type: "MemberExpression",
        property: { name: "bundleReact" },
      },
    })
  );
}

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
