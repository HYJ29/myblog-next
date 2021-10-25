import React from 'react';
import { Editor } from '@/components/editor';
import { DraftLayout } from '@/components/layout';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { withSSRContext, API } from 'aws-amplify';

import * as queries from '@/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api';

export default function DraftPage({ draft }) {
  // TODO : local storage 에 editorState 있으면 hydrate 하기
  const { rawContentState, id } = draft;
  return (
    <DraftLayout
      Editor={Editor}
      rawContentState={rawContentState}
      draftId={id}
    />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await API.graphql({
      query: queries.listDrafts,
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    const drafts = res.data?.listDrafts?.items ?? null;
    const paths = drafts.map((draft) => ({
      params: { draftId: draft.id, userId: draft.userId },
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
      query: queries.getDraft,
      variables: { id: params.draftId },
      authMode: GRAPHQL_AUTH_MODE.AWS_IAM,
    });
    const draft = res.data.getDraft;
    return { props: { draft }, revalidate: 10 };
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
//   const { draftId } = query;
//   const res = await API.graphql({
//     query: getDraft,
//     variables: { id: draftId },
//   });
//   const draft = res.data.getDraft;
//   return { props: { draft } };
// };
