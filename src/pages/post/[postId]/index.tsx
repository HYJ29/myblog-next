import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { withSSRContext } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import { getPostById } from '@/data';
import { Editor } from '@/components/editor';
import { PostLayout } from '@/components/layout';
import { getPost } from '@/graphql/queries';

import styles from './style.module.scss';

export default function PostDetailPage({ post }) {
  const { rawContentState, titlePhoto, title, subTitle, owner, id } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subTitle} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={titlePhoto} />
      </Head>
      <PostLayout
        Editor={Editor}
        rawContentState={rawContentState}
        titlePhoto={titlePhoto}
        title={title}
        subTitle={subTitle}
        owner={owner}
        post={post}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { API } = withSSRContext({ req });
  const { postId } = query;
  try {
    const res = await API.graphql({
      query: getPost,
      variables: { id: postId },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    const post = res.data.getPost;
    return { props: { post } };
  } catch (e) {
    console.log(`e`, e);
  }
};
