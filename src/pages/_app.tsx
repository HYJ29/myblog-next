import React, { useEffect, useContext, createContext, useReducer } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import produce from 'immer';

import Head from 'next/head';
import Amplify, { API, Storage, Auth, Hub, withSSRContext } from 'aws-amplify';

import { userByProviderKey } from '@/graphql/queries';
import { awsExports } from '@/config';

import './globals.scss';

Amplify.configure({
  ...awsExports,
  ssr: true,
});

const INITIAL_AUTH_STATE = {
  user: null,
  auth: null,
  isAuthenticated: false,
  isSignIned: false,
};

const authReduceer = produce((draft, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      draft.auth = action.payload;
      draft.isAuthenticated = true;
      break;
    case 'USER_SIGN_IN':
      draft.user = action.payload;
      draft.isSignIned = true;
      break;
    case 'SIGN_OUT':
      return INITIAL_AUTH_STATE;

    default:
      // throw Error('No matching type');
      return;
  }
}, INITIAL_AUTH_STATE);

export const AuthContext = createContext({});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [authState, dispatch] = useReducer(authReduceer, INITIAL_AUTH_STATE);

  const listenAuthHandler = async ({ payload: { event, data } }) => {
    switch (event) {
      case 'signIn':
        dispatch({ type: 'AUTHENTICATE', payload: data });
        break;
      case 'signOut':
        dispatch({ type: 'SIGN_OUT' });
        break;
      case 'customOAuthState':
        try {
          const cognitoUser = await Auth.currentAuthenticatedUser();
          await userSignIn(cognitoUser);
        } catch (e) {
          console.log(`listenAuth Handler error`, e);
        }
        break;
    }
  };

  const userSignIn = async (cognitoUser) => {
    const providerKey = cognitoUser.username;
    const userOfProviderKey = await API.graphql({
      query: userByProviderKey,
      variables: { providerKey },
    });

    const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;

    if (dbUser) {
      dispatch({ type: 'USER_SIGN_IN', payload: dbUser });
    } else {
      router.push('/user/register');
    }
  };

  useEffect(() => {
    Hub.listen('auth', listenAuthHandler);

    Auth.currentAuthenticatedUser()
      .then((cognitoUser) => {
        dispatch({ type: 'AUTHENTICATE', payload: cognitoUser });
        return cognitoUser;
      })
      .then((cognitoUser) => {
        userSignIn(cognitoUser);
      })
      .catch((e) => dispatch({ type: 'SIGN_OUT' }));

    return () => {
      Hub.remove('auth', listenAuthHandler);
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ authState, dispatch }}>
        <Head>
          <title>LOG</title>
          <meta
            name="description"
            content={'블로그하기 위해서 만든 개발 블로그 입니다.'}
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:title" content="LOG" key="title" />
          <meta property="og:type" content="site" />
          <meta
            property="og:description"
            content="블로그하기 위해서 만든 개발 블로그 입니다."
          />
          <meta
            property="og:image"
            content={
              'https://mynextblog.s3.ap-northeast-2.amazonaws.com/default_cover_image.png'
            }
          />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="preload"
            href="/fonts/Pacifico-Regular.ttf"
            as="font"
            crossOrigin=""
          />
        </Head>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </>
  );
}

export default MyApp;
