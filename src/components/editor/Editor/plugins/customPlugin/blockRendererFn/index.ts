import { ContentBlock, EditorState } from 'draft-js';

import AtomicBlockComponent from '@/components/editor/Editor/blocks/atomicBlock';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
};

export default ({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
}: Props) => (block: ContentBlock) => {
  const type = block.getType();

  switch (type) {
    case 'atomic':
      return {
        component: AtomicBlockComponent,
        editable: false,
        props: { setIsEditorReadOnly, editorState, setEditorState },
      };
  }
};
