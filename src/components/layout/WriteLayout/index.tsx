import React, { useState } from 'react';
import { EditorState } from 'draft-js';

import compositeDecorator from '@/components/editor/Editor/plugins/customPlugin/decorators';

import styles from './style.module.scss';
import WriteHeader from '../Headers/WriteHeader';

type Props = {
  Editor: typeof React.Component;
};

export default function WriteLayout({ Editor }: Props): JSX.Element {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty(compositeDecorator)
  );
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <WriteHeader editorState={editorState} />
      </div>

      <div className={styles.headerPlaceholder} />
      <div className={styles.editorContainer}>
        <div className={styles.container}>
          <Editor editorState={editorState} setEditorState={setEditorState} />
        </div>
      </div>
    </div>
  );
}
