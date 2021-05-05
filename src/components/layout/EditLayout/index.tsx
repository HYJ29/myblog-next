import React, { useState, useContext } from 'react';

import { parseEditorState } from '@/data/utils';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';
import EditHeader from '../Headers/EditHeader';

type Props = {
  Editor: typeof React.Component;
  rawContentState: string;
  postId: string;
};

export default function EditLayout({
  Editor,
  rawContentState,
  postId,
}: Props): JSX.Element {
  const parsedEditorState = parseEditorState(rawContentState);
  const [editorState, setEditorState] = useState(parsedEditorState);
  const { authState } = useContext(AuthContext);
  const { id: userId } = authState.user;
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <EditHeader editorState={editorState} postId={postId} userId={userId} />
      </div>

      <div className={styles.headerPlaceholder} />
      <div className={styles.editorContainer}>
        <div className={styles.container}>
          <Editor
            editorState={editorState}
            setEditorState={setEditorState}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
