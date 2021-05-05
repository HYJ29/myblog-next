import React from 'react';
import { Editor } from '@/components/editor';
import { DraftLayout } from '@/components/layout';
import { GetServerSideProps } from 'next';
import { withSSRContext } from 'aws-amplify';

import { getDraft } from '@/graphql/queries';

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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { API } = withSSRContext({ req });
  const { draftId } = query;
  const res = await API.graphql({
    query: getDraft,
    variables: { id: draftId },
  });
  const draft = res.data.getDraft;
  return { props: { draft } };
};
