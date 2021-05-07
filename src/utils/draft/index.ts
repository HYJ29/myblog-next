import {
  EditorState,
  AtomicBlockUtils,
  SelectionState,
  ContentBlock,
  Modifier,
} from 'draft-js';

type addAtomicProps = {
  editorState: EditorState;
  entityType: string;
  data?: any;
};

export const addAtomicBlock = ({
  editorState,
  entityType,
  data,
}: addAtomicProps) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    'IMMUTABLE',
    data
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const editorStateWithNewEntity = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  const newEditorState = AtomicBlockUtils.insertAtomicBlock(
    editorStateWithNewEntity,
    entityKey,
    ' '
  );

  return newEditorState;
};

export const tollgeToLinkBlock = {};

type getBlockDeletedEditorStateProps = {
  editorState: EditorState;
  block: ContentBlock;
};

export const getBlockDeletedEditorState = ({
  editorState,
  block,
}: getBlockDeletedEditorStateProps) => {
  const currentContentState = editorState.getCurrentContent();
  const currentBlockKey = block.getKey();

  const beforeBlock = currentContentState.getBlockBefore(currentBlockKey);
  const beforeBlockKey = beforeBlock?.getKey();
  const beforeBlockLength = beforeBlock?.getLength();
  const afterBlockKey = currentContentState.getKeyAfter(currentBlockKey);

  const blockSelectionState = SelectionState.createEmpty(currentBlockKey).merge(
    {
      anchorKey: beforeBlockKey,
      anchorOffset: beforeBlockLength,
      focusKey: afterBlockKey,
      focusOffset: 0,
    }
  );

  const removedContentState = Modifier.removeRange(
    currentContentState,
    blockSelectionState,
    'forward'
  );

  const newEditorState = EditorState.createWithContent(removedContentState);

  return newEditorState;
};

export const getReplacedEntityDataEditorState = ({
  data,
  editorState,
  entityKey,
}) => {
  const contentState = editorState.getCurrentContent();

  const newContentState = contentState.replaceEntityData(entityKey, data);

  const newEditorState = EditorState.set(editorState, {
    currentContent: newContentState,
  });

  return newEditorState;
};
