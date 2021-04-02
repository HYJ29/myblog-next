import React, { useState } from 'react';

import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default function EditorComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <Editor
      editorState={editorState}
      onChange={(editorState) => setEditorState(editorState)}
    />
  );
}
