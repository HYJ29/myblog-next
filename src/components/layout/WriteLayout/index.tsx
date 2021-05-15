import React, { useState, useContext } from 'react';
import { EditorState } from 'draft-js';

import compositeDecorator from '@/components/editor/Editor/plugins/customPlugin/decorators';
import { AuthContext } from '@/pages/_app';

import styles from './style.module.scss';
import WriteHeader from '../Headers/WriteHeader';

type Props = {
  Editor: typeof React.Component;
};

export default function WriteLayout({ Editor }: Props): JSX.Element | null {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(compositeDecorator)
  );

  const { authState } = useContext(AuthContext);

  return authState.user ? (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <WriteHeader editorState={editorState} userId={authState.user.id} />
      </div>

      <div className={styles.headerPlaceholder} />
      <div className={styles.editorContainer}>
        <div className={styles.container}>
          <Editor
            editorState={editorState}
            setEditorState={setEditorState}
            userId={authState.user.id}
          />
        </div>
      </div>
    </div>
  ) : null;
}
