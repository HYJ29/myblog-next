import React, { useRef } from 'react';
import { withSSRContext, API } from 'aws-amplify';

import { DefaultLayout } from '@/components/layout';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

import { createUser } from '@/graphql/mutations';

import styles from './style.module.scss';
import { GetServerSideProps } from 'next';
import { userByProviderKey } from '@/graphql/queries';

export default function RegisterPage({ username }) {
  // const {providerType, providerKey} =
  const nameInputRef = useRef();

  const onSubmitHandler = async () => {
    const registerInfo = {
      providerKey: username,
      userNickname: nameInputRef.current?.value ?? '',
      baseType: 'User',
    };

    const newUser = await API.graphql({
      query: createUser,
      variables: { input: registerInfo },
    });
  };

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <Input
            ref={nameInputRef}
            placeholder="Type your name to show others!"
          />

          <Button onClick={onSubmitHandler}>register</Button>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const { Auth, API } = withSSRContext({ req });
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const providerKey = cognitoUser.username;
    const userOfProviderKey = await API.graphql({
      query: userByProviderKey,
      variables: { providerKey },
    });
    const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;
    if (dbUser) {
      res.writeHead(302, { Location: '/auth' });
      res.end();
    } else {
      return;
    }
  } catch {
    res.writeHead(302, { Location: '/auth' });
    res.end();
  }
};
