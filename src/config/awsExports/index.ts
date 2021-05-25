let config: object = {};

// awsConfig from env variables.
// It is set on vercel
// only differences are signin & signout urls
// it's array of urls on localhost
// but it's production url on production
const envConfig = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id:
    process.env.NEXT_PUBLIC_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,
  aws_user_pools_id: process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_AWS_USER_POOLS_WEB_CLIENT_ID,
  oauth: {
    domain: process.env.NEXT_PUBLIC_DOMAIN,
    scope: JSON.parse(process.env.NEXT_PUBLIC_SCOPE!),
    redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN,
    redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT,
    responseType: process.env.NEXT_PUBLIC_RESPONSE_TYPE,
  },
  federationTarget: process.env.NEXT_PUBLIC_FEDREATION_TARGET,
  aws_appsync_graphqlEndpoint:
    process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.NEXT_PUBLIC_AWS_APPSYNC_REGION,
  aws_appsync_authenticationType:
    process.env.NEXT_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
  aws_appsync_apiKey: process.env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY,
  aws_user_files_s3_bucket: process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET,
  aws_user_files_s3_bucket_region:
    process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET_REGION,
};
const isDevelopment = process.env.NODE_ENV === 'development';

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV);

// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//     window.location.hostname === '[::1]' ||
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
// );

const vercelUrl = process.env.VERCEL_URL;
const nextPublicVercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

console.log(`vercelUrl`, vercelUrl);
console.log(`nextPublicVercelUrl`, nextPublicVercelUrl);

const vercelDeployedUrl = vercelUrl ? vercelUrl : nextPublicVercelUrl;

if (vercelDeployedUrl) {
  const vercelDeployedFullUrl = 'https://' + vercelDeployedUrl;
  console.log(`vercelDeployedUrl`, vercelDeployedUrl);
  const updatedConfig = {
    ...envConfig,
    oauth: {
      ...envConfig.oauth,
      redirectSignIn: vercelDeployedFullUrl,
      redirectSignOut: vercelDeployedFullUrl,
    },
  };

  config = updatedConfig;
} else {
  let updatedConfig = {};

  try {
    const awsExports = require('../../aws-exports');
    const awsConfig = awsExports.default;
    const [
      localRedirectSignIn,
      productionRedirectSignIn,
    ] = awsConfig.oauth.redirectSignIn.split(',');

    const [
      localRedirectSignOut,
      productionRedirectSignOut,
    ] = awsConfig.oauth.redirectSignOut.split(',');

    updatedConfig = {
      ...awsConfig,
      oauth: {
        ...awsConfig.oauth,
        redirectSignIn: localRedirectSignIn,
        redirectSignOut: localRedirectSignOut,
      },
    };
  } catch (e) {
    console.log(`e`, e);
  } finally {
    config = updatedConfig;
  }
}

export default config;
