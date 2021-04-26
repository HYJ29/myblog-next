import React from 'react';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { Card } from '@/components/ui';
import { DefaultLayout } from '@/components/layout';
import { getAllPosts } from '@/data';
import { userByProviderKey } from '@/graphql/queries';

import styles from './style.module.scss';

type Props = {
  posts: any;
};

export default function HomePage({ posts }: Props): JSX.Element {
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <main>
          <ul className={styles.postListContainer}>
            {posts.map((post) => (
              <Card
                key={post.id}
                postId={post.id}
                titlePhoto={post.titlePhoto}
                title={post.title}
                subTitle={post.subTitle}
                createdAt={post.createdAt}
              />
            ))}
          </ul>
        </main>
        <footer></footer>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const { Auth, API } = withSSRContext({ req });
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (cognitoUser) {
      //TODO : CHECK is user registered on DB
      const providerKey = cognitoUser.username;
      const userOfProviderKey = API.graphql({
        query: userByProviderKey,
        variables: { providerKey },
      });
      const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;

      if (dbUser) {
        const posts = getAllPosts();
        return { props: { posts } };
      } else {
        // IF not registered, do below
        res.writeHead(302, { Location: '/user/register' });
        res.end();
      }
    }
  } catch (e) {
    const posts = getAllPosts();
    return { props: { posts } };
  }
};
