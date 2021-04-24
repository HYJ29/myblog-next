import { ContentBlock, EditorState } from 'draft-js';

import AtomicBlockComponent from '@/components/editor/Editor/blocks/atomicBlocks';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
};

export const createBlockRendereFn = ({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
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
        },
      };
  }
};

export default createBlockRendereFn;
