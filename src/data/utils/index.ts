import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

export const stringfyEditorState = (editorState: EditorState): string =>
  JSON.stringify(convertToRaw(editorState.getCurrentContent()));

export const parseEditorState = (
  rawEditorContentStateString: string
): EditorState =>
  EditorState.createWithContent(
    convertFromRaw(JSON.parse(rawEditorContentStateString))
  );
