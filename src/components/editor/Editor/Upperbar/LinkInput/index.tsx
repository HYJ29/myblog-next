import React, { useRef, useEffect } from 'react';
import { EditorState, RichUtils, Editor } from 'draft-js';

type Props = {
  editorState: EditorState;
  setEditorState: (arg: EditorState) => void;
  setIsLinkInputActivated: (arg: boolean) => void;
  setIsEditorReadOnly: (arg: boolean) => void;
};

export default function LinkInput({
  editorState,
  setEditorState,
  setIsLinkInputActivated,
  setIsEditorReadOnly,
}: Props) {
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const submit = () => {
    const inputValue = inputRef.current.value;

    const currentSelection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: inputValue }
    );
    const linkEntityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    const linkToggledNewEditorState = RichUtils.toggleLink(
      newEditorState,
      currentSelection,
      linkEntityKey
    );

    setEditorState(linkToggledNewEditorState);
    setIsLinkInputActivated(false);
    setIsEditorReadOnly(false);
  };

  const onKeyDownHadler = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      submit();
    }
  };
  return (
    <div>
      <input ref={inputRef} onKeyDown={onKeyDownHadler} />
    </div>
  );
}
