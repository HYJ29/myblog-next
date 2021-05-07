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
    return titlePhotoEntity?.data?.unsplashImageInfo?.regularImageSrc || null;
  } else if (titlePhotoEntity.type === 'GENERAL_IMAGE') {
    return titlePhotoEntity?.data?.imageUrl || null;
  } else {
    return null;
  }
};

export const getImagesFromEditorState = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  const generalImages = [];
  for (const key in entityMap) {
    const currentEntity = entityMap[key];
    if (currentEntity.type === 'GENERAL_IMAGE') {
      generalImages.push(currentEntity);
    }
  }
  return generalImages;
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
  const titleText = firstTitleBlock ? firstTitleBlock.text : '제목없음';
  const firstSubTitleBlock = blocks.find(
    (block) => block.type === 'header-four'
  );
  const subTitleText = firstSubTitleBlock ? firstSubTitleBlock.text : '';

  return { titleText, subTitleText };
};

export const getTagsFromEditorState = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const HASHTAG_REGEX = /#[가-힣\w\u0590-\u05ff]+/g;

  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { blocks } = rawContentState;
  return blocks.reduce((tags: string[], block) => {
    const text = block.text;
    let matchArr;
    while ((matchArr = HASHTAG_REGEX.exec(text)) !== null) {
      const matchString = matchArr[0];
      const sameIndex = tags.findIndex((tag) => tag === matchString);

      const stringWithoutHashTag = matchString.slice(1);
      if (sameIndex === -1) tags.push(stringWithoutHashTag);
    }
    return tags;
  }, []);
};

export const getSubjectsFromEditorState = ({ editorState }) => {
  const contentState = editorState.getCurrentContent();
  const blocks = contentState.getBlocksAsArray();
  console.log(`blocks`, blocks);
  const subjectBlocks = blocks.filter((block) => block.type === 'header-five');
  return subjectBlocks;
};
