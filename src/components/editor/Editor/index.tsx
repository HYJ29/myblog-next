import React, { useState } from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { useSidebarPosition } from '@/hooks/useSidebarPosition';

import Sidebar from './Sidebar';
import styles from './style.module.scss';

export default function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  console.log('render Editor ');

  const { left, top, scale } = useSidebarPosition({ editorState });

  return (
    <div className={styles.container}>
      <Editor
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
      />
      <Sidebar top={top} left={left} scale={scale} />
    </div>
  );
}
