const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');
const path = require('path');

module.exports = (phase, { defaultConfig }) => {
  // Env setting
  let env = {};

  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      env = {};
      break;
    default:
  }

  // sass setting
  const sassOptions = {
    includePaths: [path.join(__dirname, '/src/styles')],
  };

  // Ignore typescript build error
  const typescript = {
    ignoreBuildErrors: true,
  };

  return { ...defaultConfig, sassOptions, typescript };
};
