const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function (config) {
  // Add alias imports from Typescript paths
  alias(configPaths('tsconfig.paths.json'))(config);
  return config;
};
