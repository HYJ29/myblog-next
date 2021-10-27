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

  // webpack
  const webpack = (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack }
  ) => {
    const modifiedConfig = {
      ...config,
      module: {
        rules: [
          ...config.module.rules,
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
    };

    // Important: return the modified config
    return modifiedConfig;
  };

  //images
  const images = {
    domains: [
      'myblognextstorage84942-develop.s3.ap-northeast-2.amazonaws.com',
      'myblognextstorage84942-staged.s3.ap-northeast-2.amazonaws.com',
      'myblognextstorage84942-main.s3.ap-northeast-2.amazonaws.com',
      'images.unsplash.com',
    ],
  };

  return { ...defaultConfig, sassOptions, typescript, webpack, images };
};
