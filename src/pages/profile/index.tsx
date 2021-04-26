import React, { useEffect, useContext } from 'react';

import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import { DefaultLayout } from '@/components/layout';
import { AuthContext } from '@/pages/_app';

export default function Profile() {
  const router = useRouter();

  const { authState } = useContext(AuthContext);
  console.log(`authState`, authState);
  const { user, isAuthenticated } = authState;

  console.log(`user`, user);

  return (
    <DefaultLayout>
      <div style={{ width: '100%', height: '100%' }}>
        {user && <div>{user.username}</div>}
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
