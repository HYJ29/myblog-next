import { EditorState, convertToRaw } from 'draft-js';

export const getTitlePhtoFromEditorState = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  const titlePhotoEntityKey = Object.keys(entityMap).find((key) => {
    const entityType = entityMap[key].type;
    return entityType === 'GENERAL_IMAGE' || entityType === 'UNSPLASH';
  });

  if (!titlePhotoEntityKey) return null;

  const titlePhotoEntity = entityMap[titlePhotoEntityKey];
  if (titlePhotoEntity.type === 'UNSPLASH') {
    return titlePhotoEntity.data.unsplashImageInfo.regularImageSrc;
  } else if (titlePhotoEntity.type === 'GENERAL_IMAGE') {
    // titlePhotoEntity.data.selectedFile.
    return null;
  } else {
    return null;
  }
};

export const getPostInfoFromEditorState = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { blocks } = rawContentState;

  const firstTitleBlock = blocks.find((block) => block.type === 'header-three');
  const titleText = firstTitleBlock ? firstTitleBlock.text : '';
  const firstSubTitleBlock = blocks.find(
    (block) => block.type === 'header-four'
  );
  const subTitleText = firstSubTitleBlock ? firstSubTitleBlock.text : '';

  return { titleText, subTitleText };
};
