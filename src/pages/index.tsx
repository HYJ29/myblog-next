import React from 'react';
import { GetStaticProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { Card } from '@/components/ui';
import { DefaultLayout } from '@/components/layout';
import { getAllPosts } from '@/data';

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

export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};
