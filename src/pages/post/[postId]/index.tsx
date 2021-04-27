import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { getPostById } from '@/data';
import { EditorReadOnly, Editor } from '@/components/editor';
import { PostLayout } from '@/components/layout';
import { getPost } from '@/graphql/queries';

import styles from './style.module.scss';

export default function PostDetailPage({ post }) {
  const { rawContentState, titlePhoto, title, subTitle, owner, id } = post;

  return (
    <PostLayout
      Editor={Editor}
      rawContentState={rawContentState}
      titlePhoto={titlePhoto}
      title={title}
      subTitle={subTitle}
      owner={owner}
      postId={id}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { API } = withSSRContext({ req });
  const { postId } = query;
  const res = await API.graphql({ query: getPost, variables: { id: postId } });
  const post = res.data.getPost;
  console.log(`res`, res);
  return { props: { post } };
};
