const Module = require("module");
const originalLoad = Module._load;
const originalResolveFilename = Module._resolveFilename;

module.exports = {
  start: (name, fn) => {
    Module._load = function (request, parent) {
      console.log(request);
      if (!parent) return originalLoad.apply(this, arguments);

      if (name === request) {
        return fn;
      }
      return originalLoad.apply(this, arguments);
    };
    Module._resolveFilename = function (request) {
      if (name === request) {
        return name;
      }
      return originalResolveFilename.apply(this, arguments);
    };
  },
  stop: () => {
    Module._load = originalLoad;
    Module._resolveFilename = originalResolveFilename;
  },
};
