import React, { useState, useRef, useEffect } from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { useSidebarPosition } from '@/hooks/useSidebarPosition';

import Sidebar from './Sidebar';
import styles from './style.module.scss';

export default function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const editorrRef = useRef<Editor>(null);

  const { left, top, scale } = useSidebarPosition({ editorState });

  useEffect(() => {
    editorrRef.current?.focus();
  }, []);

  const onClickEditorContainerHandler = () => {
    if (editorrRef && editorrRef.current) {
      editorrRef.current.focus();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.editorContainer}
        onClick={onClickEditorContainerHandler}
      >
        <Editor
          editorState={editorState}
          onChange={(editorState) => setEditorState(editorState)}
          onFocus={() => setIsEditorFocused(true)}
          onBlur={() => setIsEditorFocused(false)}
          ref={editorrRef}
        />
      </div>
      <Sidebar
        top={top}
        left={left}
        scale={scale}
        isEditorFocused={isEditorFocused}
      />
    </div>
  );
}
