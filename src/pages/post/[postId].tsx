import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { getPostById } from '@/data';

export default function PostDetailPage({ post }) {
  return <div>{post.id}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;
  const post = getPostById(postId);
  return { props: { post } };
};
