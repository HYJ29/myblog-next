import React from 'react';
import { ContentState, ContentBlock, EditorState } from 'draft-js';

import UnSplash from './UnSplash';

type Props = {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: {
    setIsEditorReadOnly: (arg0: boolean) => void;
    editorState: EditorState;
    setEditorState: (arg: EditorState) => void;
  };
};

export default function AtomicBlockComponent({
  contentState,
  block,
  blockProps,
}: Props) {
  const { setIsEditorReadOnly, editorState, setEditorState } = blockProps;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const type = entity.getType();

  if (type === 'UNSPLASH') {
    return (
      <UnSplash
        setIsEditorReadOnly={setIsEditorReadOnly}
        editorState={editorState}
        setEditorState={setEditorState}
        block={block}
      />
    );
  }

  return <div>AtomicBlockComponent</div>;
}
