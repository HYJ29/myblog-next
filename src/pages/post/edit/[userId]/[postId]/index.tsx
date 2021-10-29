import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Editor } from '@/components/editor';
import { EditLayout } from '@/components/layout';
import { Loader } from '@/components';
import { GetServerSideProps, GetStaticProps, GetStaticPaths } from 'next';
import { withSSRContext, API } from 'aws-amplify';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

import * as queries from '@/graphql/queries';

export default function PostEditPage({ post }) {
  const router = useRouter();
  if (router.isFallback) {
    return <Loader />;
  }
  // TODO : local storage 에 editorState 있으면 hydrate 하기
  const { rawContentState, id } = post;

  return (
    <EditLayout Editor={Editor} rawContentState={rawContentState} postId={id} />
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

    return { paths, fallback: true };
  } catch (e) {
    console.log(`e`, e);

    return { paths: [], fallback: true };
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

// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   query,
// }) => {
//   const { API } = withSSRContext({ req });
//   const { postId } = query;
//   const res = await API.graphql({ query: getPost, variables: { id: postId } });
//   const post = res.data.getPost;
//   return { props: { post } };
// };
