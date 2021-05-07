import { EditorState } from 'draft-js';

import { addAtomicBlock } from '@/utils';

export const createHandlerPastedFiles = ({
  editorState,
  setEditorState,
}: {
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
}) => (files: FileList) => {
  const selectedFile = files[0];
  const newEditorState = addAtomicBlock({
    editorState,
    entityType: 'GENERAL_IMAGE',
    data: { selectedFile },
  });
  setEditorState(newEditorState);
};

export default createHandlerPastedFiles;
