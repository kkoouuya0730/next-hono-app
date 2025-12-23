const awsExports = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION!,
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_APP_CLIENT_ID!,
    },
  },
};

export default awsExports;
