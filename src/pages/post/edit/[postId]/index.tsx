import React from 'react';
import { Editor } from '@/components/editor';
import { EditLayout } from '@/components/layout';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { getPost } from '@/graphql/queries';

export default function PostEditPage({ post }) {
  // TODO : local storage 에 editorState 있으면 hydrate 하기
  const { rawContentState, id } = post;
  return (
    <EditLayout Editor={Editor} rawContentState={rawContentState} postId={id} />
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
  return { props: { post } };
};
