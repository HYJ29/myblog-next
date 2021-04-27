import React, { useEffect, useContext } from 'react';

import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import { DefaultLayout } from '@/components/layout';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';

export default function Profile() {
  const router = useRouter();

  const { authState } = useContext(AuthContext);
  const { user, isAuthenticated } = authState;

  return (
    <DefaultLayout>
      <div className={styles.container}>
        {user && <div>Hi! {user.userNickname}</div>}
        <AmplifySignOut
          handleAuthStateChange={(nextAuthState, data) => {
            if (nextAuthState === AuthState.SignedOut) {
              router.push('/auth');
            }
          }}
        />
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();

    return {
      props: {
        authenticated: true,
        user: user.username,
      },
    };
  } catch (e) {
    res.writeHead(302, { Location: '/auth' });
    res.end();
  }
}
