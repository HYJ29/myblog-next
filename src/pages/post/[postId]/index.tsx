import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { getPostById } from '@/data';
import { parseEditorState } from '@/data/utils';
import { EditorReadOnly } from '@/components/editor';

import styles from './style.module.scss';

export default function PostDetailPage({ post }) {
  const { editorState, titlePhoto, title, subTitle } = post;
  const parsedEditorState = parseEditorState(editorState);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{title}</h1>
        <h3>{subTitle}</h3>
        {titlePhoto && (
          <div className={styles.imageContainer}>
            <img
              className={styles.coverImage}
              alt="cover-image"
              src={titlePhoto}
            />
          </div>
        )}
      </div>

      <div className={styles.editorContainer}>
        <EditorReadOnly editorState={parsedEditorState} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.query;
  const post = getPostById(postId);
  return { props: { post } };
};
