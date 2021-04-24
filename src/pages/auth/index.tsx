import React, { useState, useEffect, useContext } from 'react';
import {
  AmplifyAuthenticator,
  AmplifySignOut,
  AmplifySignUp,
} from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { withSSRContext } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { GoogleLoginButton } from 'react-social-login-buttons';

import { DefaultLayout } from '@/components/layout';
import { AuthContext } from '@/pages/_app';
import { useSocialSignin } from '@/hooks/useSocislSignin';
import GoogleLogin from '@/components/googleLogin';

import styles from './style.module.scss';

export default function AuthPage() {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  console.log(`authState`, authState);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <GoogleLoginButton
          style={{ width: 500 }}
          align="center"
          onClick={async () => {
            Auth.federatedSignIn({
              provider: CognitoHostedUIIdentityProvider.Google,
            }).then((cred) => {
              console.log(`cred`, cred);
            });
          }}
        >
          login with google
        </GoogleLoginButton>
        <GoogleLogin />
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    res.writeHead(302, { Location: '/profile' });
    res.end();
  } catch (e) {
    return {
      props: {
        authenticated: false,
      },
    };
  }
}
