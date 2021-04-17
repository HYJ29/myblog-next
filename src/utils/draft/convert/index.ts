import { convertToRaw } from 'draft-js';

export const getConvertedToRawContentState = ({ editorState }) => {
  return convertToRaw(editorState.getCurrentContent());
};
