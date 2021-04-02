import React, { useState } from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import styles from './style.module.scss';

type Props = {
  editorState: EditorState;
};

export default function EditorReadOnly({ editorState }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={(editorState) => {}}
          readOnly
        />
      </div>
    </div>
  );
}
