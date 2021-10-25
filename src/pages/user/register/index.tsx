import React, { useRef, useEffect, useState } from 'react';
import { withSSRContext, API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

import { DefaultLayout } from '@/components/layout';
import { Input } from '@/components/input';
import { Button } from '@/components/button';

import { createUser } from '@/graphql/mutations';

import styles from './style.module.scss';
import { GetServerSideProps } from 'next';
import { userByProviderKey } from '@/graphql/queries';

export default function RegisterPage() {
  const router = useRouter();
  const nameInputRef = useRef();

  const [username, setUsername] = useState(null);

  useEffect(() => {
    (async () => {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const providerKey = cognitoUser.username;
      const userOfProviderKey = await API.graphql({
        query: userByProviderKey,
        variables: { providerKey },
      });
      const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;
      if (dbUser) {
        router.push('/');
      } else {
        setUsername(providerKey);
      }
    })();
  }, []);

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
    router.push('/');
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

// export const getServerSideProps = async ({ req, res }) => {
//   const { Auth, API } = withSSRContext({ req });
//   try {
//     const cognitoUser = await Auth.currentAuthenticatedUser();
//     const providerKey = cognitoUser.username;
//     const userOfProviderKey = await API.graphql({
//       query: userByProviderKey,
//       variables: { providerKey },
//     });
//     const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;
//     if (dbUser) {
//       res.writeHead(302, { Location: '/' });
//       res.end();
//     } else {
//       return { props: { username: providerKey } };
//     }
//   } catch {
//     res.writeHead(302, { Location: '/auth' });
//     res.end();
//   }
// };
