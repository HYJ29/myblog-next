import React, { useState, useRef, useEffect } from 'react';

import { EditorState } from 'draft-js';
import Editor from '@draft-js-plugins/editor';
import 'draft-js/dist/Draft.css';
import createLinkifyPlugin from '@draft-js-plugins/linkify';
import '@draft-js-plugins/linkify/lib/plugin.css';

import { useSidebarPosition, useUpperbarPosition } from '@/hooks';
import { getConvertedToRawContentState } from '@/utils/draft/convert';

import Sidebar from './Sidebar';
import Uppperbar from './Upperbar';
import { createCustomPlugin } from './plugins';
import compositeDecorator from './plugins/customPlugin/decorators';
import styles from './style.module.scss';
import Upperbar from './Upperbar';

// const linkifyPlugin = createLinkifyPlugin();

export default function EditorComponent({
  editorState,
  setEditorState,
  isPostMode,
}: {
  editorState: EditorState;
  setEditorState: (arg: EditorState) => void;
  isPostMode?: boolean;
}): React.ReactNode {
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [isEditorReadOnly, setIsEditorReadOnly] = useState(false);
  const editorrRef = useRef<Editor>(null);

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
  } = useUpperbarPosition({
    editorState,
  });

  useEffect(() => {
    editorrRef.current?.focus();
  }, []);

  // const rawContentState = getConvertedToRawContentState({ editorState });

  const onClickEditorContainerHandler = () => {
    if (editorrRef && editorrRef.current) {
      editorrRef.current.focus();
    }
  };

  const customPlugin = createCustomPlugin({
    editorState,
    setEditorState,
    setIsEditorReadOnly,
  });

  return (
    <div className={styles.container}>
      <div
        className={styles.editorContainer}
        onClick={onClickEditorContainerHandler}
      >
        {/* temp block for dev */}
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 680,
          }}
        > */}
        <div style={{ width: 500 }}>
          <Editor
            editorState={editorState}
            onChange={(editorState) => setEditorState(editorState)}
            onFocus={() => setIsEditorFocused(true)}
            onBlur={() => setIsEditorFocused(false)}
            ref={editorrRef}
            plugins={[customPlugin]}
            readOnly={isPostMode ? true : isEditorReadOnly}
          />
        </div>
        {/* <pre style={{ minHeight: '100vh', width: 100 }}>
            {JSON.stringify(rawContentState, null, 2)}
          </pre>
        </div> */}
      </div>
      {!isPostMode && (
        <>
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
            setIsEditorReadOnly={setIsEditorReadOnly}
          />
        </>
      )}
    </div>
  );
}
