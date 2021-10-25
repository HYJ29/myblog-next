import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { withSSRContext } from 'aws-amplify';
import API, { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import { getPostById } from '@/data';
import { Editor } from '@/components/editor';
import { PostLayout } from '@/components/layout';
import * as queries from '@/graphql/queries';

import styles from './style.module.scss';

export default function PostDetailPage({ post }) {
  const { rawContentState, titlePhoto, title, subTitle, owner, id } = post;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={subTitle} />
        <meta property="og:title" content={title} key="title" />
        <meta property="og:description" content={subTitle} data-rh="true" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={titlePhoto} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={subTitle} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={titlePhoto} />
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

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await API.graphql({
      query: queries.listPosts,
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    const posts = res.data?.listPosts?.items ?? null;
    const paths = posts.map((post) => ({
      params: { postId: post.id, userId: post.userId },
    }));

    return { paths, fallback: false };
  } catch (e) {
    console.log(`e`, e);

    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const res = await API.graphql({
      query: queries.getPost,
      variables: { id: params.postId },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    const post = res.data.getPost;
    return { props: { post }, revalidate: 10 };
  } catch (e) {
    console.log(`e`, e);
    return { notFound: true };
  }
};
