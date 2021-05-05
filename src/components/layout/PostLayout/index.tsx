import React, { useState, useContext } from 'react';
import { EditorState } from 'draft-js';

import compositeDecorator from '@/components/editor/Editor/plugins/customPlugin/decorators';
import { parseEditorState } from '@/data/utils';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';
import PostHeader from '../Headers/PostHeader';

type Props = {
  Editor: typeof React.Component;
  rawContentState: string;
  titlePhoto: string;
  title: string;
  subTitle: string;
  owner: string;
  post: any;
};

export default function PostLayout({
  Editor,
  rawContentState,
  titlePhoto,
  title,
  subTitle,
  owner,
  post,
}: Props): JSX.Element {
  const parsedEditorState = parseEditorState(rawContentState);
  const [editorState, setEditorState] = useState(parsedEditorState);
  const { authState } = useContext(AuthContext);
  const { username } = authState.auth;
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <PostHeader
          editorState={editorState}
          owner={owner}
          post={post}
          username={username}
        />
      </div>
      <div className={styles.headerPlaceholder} />
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          setEditorState={setEditorState}
          isPostMode={true}
        />
      </div>
    </div>
  );
}
