import { ContentBlock, EditorState } from 'draft-js';

import AtomicBlockComponent from '@/components/editor/Editor/blocks/atomicBlock';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  isEditorReadOnly: { value: boolean };
};

export default ({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  isEditorReadOnly,
}: Props) => (block: ContentBlock) => {
  const blockType = block.getType();

  switch (blockType) {
    case 'atomic':
      return {
        component: AtomicBlockComponent,
        editable: false,
        props: {
          setIsEditorReadOnly,
          editorState,
          setEditorState,
          isEditorReadOnly,
        },
      };
  }
};
