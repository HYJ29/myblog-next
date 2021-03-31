const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  let env = {};

  console.log(
    `process.env.NEXT_PUBLIC_BROWSER_VARIABLE`,
    process.env.NEXT_PUBLIC_BROWSER_VARIABLE
  );
  console.log(`process.env.SERVER_VARIABLE`, process.env.SERVER_VARIABLE);

  switch (phase) {
    case PHASE_DEVELOPMENT_SERVER:
      env = {};
      break;
    default:
      return;
  }

  return { ...defaultConfig, env };
};
