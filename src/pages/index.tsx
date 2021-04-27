import React from 'react';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { Card } from '@/components/ui';
import { DefaultLayout } from '@/components/layout';
import { getAllPosts } from '@/data';
import { userByProviderKey, listPosts } from '@/graphql/queries';

import styles from './style.module.scss';
import { ModelSortDirection } from '@/API';

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
      const userOfProviderKey = await API.graphql({
        query: userByProviderKey,
        variables: { providerKey },
      });
      const dbUser = userOfProviderKey.data.userByProviderKey.items[0] ?? null;

      console.log(`dbUser`, dbUser);

      if (dbUser) {
        const res = await API.graphql({
          query: listPosts,

          sortDirection: ModelSortDirection.DESC,
        });
        const posts = res.data.listPosts.items;

        return { props: { posts } };
      } else {
        // IF not registered, do below
        res.writeHead(302, { Location: '/user/register' });
        res.end();
      }
    }
  } catch (e) {
    // const posts = await API.graphql({ query: listPosts });
    return { props: { posts: [] } };
  }
};
