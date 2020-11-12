const path = require("path");
const { bundle } = require("./metro");

const resolvePath = (filename) => path.join(__dirname, "../fixtures", filename);

(async () => {
  const filename = "Component.jsx";
  const filePath = resolvePath(filename);
  const res = await bundle([filePath]);
  console.log(res);
})();
