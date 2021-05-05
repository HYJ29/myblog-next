import React, { useEffect } from 'react';

import { AmplifySignOut } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';
import { withSSRContext } from 'aws-amplify';
import { AuthState } from '@aws-amplify/ui-components';

import { DefaultLayout } from '@/components/layout';
import { Card } from '@/components/ui';

import styles from './style.module.scss';
import { userByProviderKey, getUser } from '@/graphql/queries';

export default function Profile({ authenticated, user }) {
  const router = useRouter();

  console.log(`user`, user);
  const drafts = user.Drafts.items;

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

        <ul className={styles.postsContainer}>
          {drafts.map((draft) => (
            <Card
              key={draft.id}
              linkTo={`/draft/${draft.id}`}
              titlePhoto={draft.titlePhoto}
              title={draft.title}
              subTitle={draft.subTitle}
              createdAt={draft.createdAt}
            />
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { Auth, API } = withSSRContext({ req });
  let dbUser = {};
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      const providerKey = cognitoUser.username;
      const userOfProviderKey = await API.graphql({
        query: userByProviderKey,
        variables: {
          providerKey,
        },
      });
      const dbUserId =
        userOfProviderKey.data.userByProviderKey?.items[0].id ?? null;

      const getUserRes = await API.graphql({
        query: getUser,
        variables: { id: dbUserId },
      });

      dbUser = getUserRes.data.getUser;
    }

    return {
      props: {
        user: dbUser,
      },
    };
  } catch (e) {
    console.log(`Error on Profile serverSide `, e);
    res.writeHead(302, { Location: '/auth' });
    res.end();
  }
}
