import React, { useState, useRef, useEffect } from 'react';

import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';

import { useSidebarPosition, useUpperbarPosition } from '@/hooks';

import Sidebar from './Sidebar';
import Uppperbar from './Upperbar';
import { createCustomPlugin } from './plugins';
import styles from './style.module.scss';
import Upperbar from './Upperbar';

export default function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [isEditorReadOnly, setIsEditorReadOnly] = useState(false);
  const editorrRef = useRef<Editor>(null);

  const isEditorReadOnlyObj = { value: isEditorReadOnly };

  const {
    left: sidebarLeft,
    top: sidbarTop,
    scale: sidebarScale,
  } = useSidebarPosition({
    editorState,
    isEditorReadOnly,
  });

  const {
    left: upperbarLeft,
    top: upperbarTop,
    scale: upperbarScale,
  } = useUpperbarPosition({ editorState, isEditorReadOnly });

  useEffect(() => {
    editorrRef.current?.focus();
  }, []);

  const jsEditorState = editorState.toJS();
  console.log(`jsEditorState`, jsEditorState);

  const onClickEditorContainerHandler = () => {
    if (editorrRef && editorrRef.current) {
      editorrRef.current.focus();
    }
  };

  const customPlugin = createCustomPlugin({
    editorState,
    setEditorState,
    setIsEditorReadOnly,
    isEditorReadOnly: isEditorReadOnlyObj,
  });

  console.log(`isEditorReadOnly at Editor`, isEditorReadOnly);

  return (
    <div className={styles.container}>
      <div
        className={styles.editorContainer}
        onClick={onClickEditorContainerHandler}
      >
        {/* temp block for dev */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 680,
          }}
        >
          <div style={{ width: 500 }}>
            <Editor
              editorState={editorState}
              onChange={(editorState) => setEditorState(editorState)}
              onFocus={() => setIsEditorFocused(true)}
              onBlur={() => setIsEditorFocused(false)}
              ref={editorrRef}
              plugins={[customPlugin]}
              readOnly={isEditorReadOnly}
            />
          </div>
          <pre style={{ minHeight: '100vh', width: 100 }}>
            {JSON.stringify(jsEditorState.currentContent.blockMap, null, 2)}
          </pre>
        </div>
      </div>

      <Sidebar
        top={sidbarTop}
        left={sidebarLeft}
        scale={sidebarScale}
        isEditorFocused={isEditorFocused}
        setEditorState={setEditorState}
        editorState={editorState}
      />
      <Upperbar
        top={upperbarTop}
        left={upperbarLeft}
        scale={upperbarScale}
        editorState={editorState}
        setEditorState={setEditorState}
      />
    </div>
  );
}
