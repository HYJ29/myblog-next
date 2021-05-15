import { ContentBlock, EditorState } from 'draft-js';

import AtomicBlockComponent from '@/components/editor/Editor/blocks/atomicBlocks';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  isPostMode?: boolean;
};

export const createBlockRendereFn = ({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  isPostMode,
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
          isPostMode,
        },
      };
  }
};

export default createBlockRendereFn;
