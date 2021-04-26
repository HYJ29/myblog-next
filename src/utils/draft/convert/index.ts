import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';

export const getConvertedToRawContentState = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  return convertToRaw(editorState.getCurrentContent());
};

export const getRawJsonContentStateFrom = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
};

export const getEditorStateFrom = ({
  rawJsonContentState,
}: {
  rawJsonContentState: string;
}) => {
  return EditorState.createWithContent(
    convertFromRaw(JSON.parse(rawJsonContentState))
  );
};
