import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { withSSRContext, API } from 'aws-amplify';
import classnames from 'classnames';

import { Card } from '@/components/ui';
import { DefaultLayout } from '@/components/layout';
import { getAllPosts } from '@/data';
import {
  userByProviderKey,
  listPosts,
  postByCreatedAt,
  tagByTagName,
  getTag,
  listPostTags,
} from '@/graphql/queries';

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

  console.log(`tags`, tags);
  const onSelectTag = async (tag) => {
    setSelectedTag(tag.tagName);
    if (tag.tagName === 'all') {
      setPosts(allPosts);
    } else {
      const postTagRes = await API.graphql({
        query: listPostTags,
        variables: { filter: { tagId: { eq: tag.id } } },
      });
      const posts = postTagRes.data.listPostTags.items.map((item) => item.post);

      console.log(`posts`, posts);
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

      if (dbUser) {
        // Get Posts
        const postRes = await API.graphql({
          query: postByCreatedAt,
          variables: {
            baseType: 'Post',
            sortDirection: ModelSortDirection.DESC,
          },
          items: {},
        });
        const posts = postRes.data.postByCreatedAt.items;

        const tagRes = await API.graphql({
          query: tagByTagName,
          variables: { baseType: 'Tag', sortDirection: 'ASC' },
        });

        const tags = tagRes.data.tagByTagName.items;

        return { props: { posts, tags } };
      } else {
        // IF not registered, do below
        res.writeHead(302, { Location: '/user/register' });
        res.end();
      }
    }
  } catch (e) {
    console.log(`e`, e);
    // const posts = await API.graphql({ query: listPosts });
    return { props: { posts: [], tags: [] } };
  }
};
