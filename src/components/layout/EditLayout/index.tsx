import React, { useState } from 'react';
import { EditorState } from 'draft-js';

import compositeDecorator from '@/components/editor/Editor/plugins/customPlugin/decorators';

import styles from './style.module.scss';
import EditHeader from '../Headers/EditHeader';
import { parseEditorState } from '@/data/utils';

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
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <EditHeader editorState={editorState} postId={postId} />
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
