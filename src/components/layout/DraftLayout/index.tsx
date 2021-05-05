import React, { useState, useContext } from 'react';

import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';
import DraftHeader from '../Headers/DraftHeader';
import { parseEditorState } from '@/data/utils';

type Props = {
  Editor: typeof React.Component;
  rawContentState: string;
  draftId: string;
};

export default function DraftLayout({
  Editor,
  rawContentState,
  draftId,
}: Props): JSX.Element {
  const parsedEditorState = parseEditorState(rawContentState);
  const [editorState, setEditorState] = useState(parsedEditorState);

  const { authState } = useContext(AuthContext);
  const { id: userId } = authState.user;

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <DraftHeader
          editorState={editorState}
          draftId={draftId}
          userId={userId}
        />
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
