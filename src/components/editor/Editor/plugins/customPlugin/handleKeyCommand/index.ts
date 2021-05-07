import { RichUtils, EditorState, DraftEditorCommand } from 'draft-js';

export const createHandleKeyCommand = (
  setEditorState: (arg0: EditorState) => void
) => (
  command: DraftEditorCommand | 'add-soft-new-line',
  editorState: EditorState
) => {
  let newEditorState;
  if (command === 'add-soft-new-line') {
    newEditorState = RichUtils.insertSoftNewline(editorState);
  } else {
    // Draft.js default key handling
    newEditorState = RichUtils.handleKeyCommand(editorState, command);
  }

  if (newEditorState) {
    setEditorState(newEditorState);
    return 'handled';
  }

  return 'not-handled';
};

export default createHandleKeyCommand;
