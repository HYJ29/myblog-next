import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';

import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import classnames from 'classnames';

import { Card } from '@/components/ui';
import { DefaultLayout } from '@/components/layout';
import { getAllPosts } from '@/data';
import {
  userByProviderKey,
  postByCreatedAt,
  tagByTagName,
  listPostTags,
} from '@/graphql/queries';

import * as queries from '@/graphql/queries';
import api from '@/apiFetch';

import styles from './style.module.scss';
import { ModelSortDirection } from '@/API';

type Props = {
  posts: any[];
  tags: string[];
};

export default function HomePage({
  posts: allPosts,
  tags,
}: Props): JSX.Element {
  const [selectedTag, setSelectedTag] = useState('all');
  const [posts, setPosts] = useState(allPosts);

  const onSelectTag = async (tag) => {
    setSelectedTag(tag.tagName);
    if (tag.tagName === 'all') {
      const allPosts = await api.post.getAllPosts();
      setPosts(allPosts);
    } else {
      const postsOfTag = await api.post.getPostByTags({ tagId: tag.id });

      setPosts(postsOfTag);
    }
  };
  return (
    <DefaultLayout>
      <div className={styles.container}>
        <main>
          <ul className={styles.tagsContainer}>
            <li
              key="all-basic-default"
              className={classnames({
                [styles.tag_all]: true,
                [styles.tag_selected]: selectedTag === 'all',
              })}
              onClick={() => onSelectTag({ tagName: 'all' })}
            >
              ALL
            </li>
            {tags.map((tag) => (
              <li
                key={tag.id}
                className={classnames({
                  [styles.tag]: true,
                  [styles.tag_selected]: tag.tagName === selectedTag,
                })}
                onClick={() => onSelectTag(tag)}
              >
                {tag.tagName}
              </li>
            ))}
          </ul>
          <ul className={styles.postListContainer}>
            {posts.map((post) => (
              <Card
                key={post.id}
                linkTo={`/post/${post.userId}/${post.id}`}
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const postsRes = await API.graphql({
      query: queries.listPosts,
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });

    const tagsRes = await API.graphql({
      query: queries.listTags,
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });

    const posts = postsRes.data?.listPosts?.items ?? [];
    const tags = tagsRes.data?.listTags?.items ?? [];

    return { props: { posts, tags }, revalidate: 10 };
  } catch (e) {
    console.log(`e`, e);
    return { notFound: true };
  }
};
