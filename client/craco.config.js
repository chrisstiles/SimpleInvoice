const { configPaths } = require('react-app-rewire-alias');
const path = require('path');
const { mapValues } = require('lodash');

module.exports = function () {
  const config = {
    babel: {
      plugins: ['lodash']
    },
    webpack: {
      alias: mapValues(configPaths('tsconfig.paths.json'), p =>
        path.resolve(p)
      ),
      configure: {
        optimization: {
          usedExports: true
        }
      }
    }
  };

  return config;
};
