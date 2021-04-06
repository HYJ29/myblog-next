import { EditorState } from 'draft-js';

import blockRenderMap from './blockRenderMap';
import keyBindingFn from './keyBindingFn';
import createHandleKeyCommand from './handleKeyCommand';
import createBlockRendererFn from './blockRendererFn';

type Props = {
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  setIsEditorReadOnly: (arg0: boolean) => void;
};

export default ({
  editorState,
  setEditorState,
  setIsEditorReadOnly,
}: Props) => {
  const handleKeyCommand = createHandleKeyCommand(setEditorState);
  const blockRendererFn = createBlockRendererFn({
    setIsEditorReadOnly,
    editorState,
    setEditorState,
  });

  return {
    blockRenderMap,
    handleKeyCommand,
    keyBindingFn,
    blockRendererFn,
  };
};
