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

import styles from './style.module.scss';
import { ModelSortDirection } from '@/API';

type Props = {
  posts: any[];
  tags: string[];
};

export default function HomePage({}: Props): JSX.Element {
  const [selectedTag, setSelectedTag] = useState('all');
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  const getAllPostsAndTags = async () => {
    try {
      const postRes = await API.graphql({
        query: postByCreatedAt,
        variables: {
          baseType: 'Post',
          sortDirection: ModelSortDirection.DESC,
        },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      });

      const posts = postRes.data.postByCreatedAt.items;
      // Get Tags
      const tagRes = await API.graphql({
        query: tagByTagName,
        variables: { baseType: 'Tag', sortDirection: 'ASC' },
        authMode: GRAPHQL_AUTH_MODE.API_KEY,
      });

      const tags = tagRes.data.tagByTagName.items;

      setPosts(posts);
      setTags(tags);
    } catch (e) {
      console.log(`getPosttasError`, e);
    }
  };
  useEffect(() => {
    getAllPostsAndTags();
  }, []);

  const onSelectTag = async (tag) => {
    setSelectedTag(tag.tagName);
    if (tag.tagName === 'all') {
      setPosts(allPosts);
    } else {
      const postTagRes = await API.graphql({
        query: listPostTags,
        variables: { filter: { tagId: { eq: tag.id } } },
      });
      // TODO : sort post with grapqhql index key
      const posts = postTagRes.data.listPostTags.items
        .map((item) => item.post)
        .sort((a, b) => {
          console.log(`a`, a);
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

      setPosts(posts);
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
                linkTo={`/post/${post.id}`}
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
