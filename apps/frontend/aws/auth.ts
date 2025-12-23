import { signUp, confirmSignUp, signIn, getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

type SignUpParam = {
  username: string;
  password: string;
  email: string;
};

export const executeSignUp = async (params: SignUpParam) => {
  await signUp({
    username: params.username,
    password: params.password,
    options: {
      userAttributes: {
        email: params.email,
      },
    },
  });
};

type ConfirmSignUpParam = {
  username: string;
  confirmationCode: string;
};

export const executeConfirmSignUp = async (params: ConfirmSignUpParam) => {
  await confirmSignUp({
    username: params.username,
    confirmationCode: params.confirmationCode,
  });
};

type SignInParam = {
  username: string;
  password: string;
};

export const executeSignIn = async (params: SignInParam) => {
  await signIn({
    username: params.username,
    password: params.password,
  });
};

export const getAuthenticatedUser = async () => {
  const user = await getCurrentUser();
  return user;
};

export const getIdToken = async () => {
  const session = await fetchAuthSession();
  return session.tokens?.idToken?.toString();
};
export const isAuthenticated = async () => {
  try {
    await getCurrentUser();
    return true;
  } catch {
    return false;
  }
};
