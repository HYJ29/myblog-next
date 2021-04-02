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
      return;
  }

  // sass setting
  const sassOptions = {
    includePaths: [path.join(__dirname, '/src/styles')],
  };

  return { ...defaultConfig, env, sassOptions };
};
