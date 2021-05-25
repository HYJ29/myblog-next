import { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';

export const useSidebarPosition = ({
  editorState,
  isEditorReadOnly,
}: {
  editorState: EditorState;
  isEditorReadOnly: boolean;
}) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    // #1. Check from window object
    const windowSelection = window.getSelection();
    const windowFocusOffset = windowSelection?.focusOffset;
    const isThrereOffsetFromFocus = windowFocusOffset && windowFocusOffset > 0;

    // #2. Check from draft.js selectionState
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const focusKey = selectionState.getFocusKey();
    const focusedBlock = contentState.getBlockForKey(focusKey);
    const focusedBlockText = focusedBlock.getText();
    const isThereTextOnBlock = focusedBlockText.length > 0;

    // If threre is any text on block(by #1,#2) || readOnly mode, hide sidebar
    if (isThereTextOnBlock || isThrereOffsetFromFocus || isEditorReadOnly) {
      setScale(0);
    }
    const anchorNode = windowSelection?.anchorNode;

    // If  threre are no text and just 'span' ELEMENT_NODE exists -> set the span element top, left position and show sidebar
    if (
      anchorNode &&
      anchorNode instanceof HTMLElement &&
      anchorNode.attributes
    ) {
      const dataOffsetKey = (anchorNode.attributes as { [key: string]: any })[
        'data-offset-key'
      ]?.value;
      // Find the most parent node with same data-offset-key
      const blockNode = document.querySelector(
        `[data-offset-key="${dataOffsetKey}"]`
      );
      if (blockNode) {
        const blockNodeRect = blockNode.getBoundingClientRect();
        const { x, top } = blockNodeRect;
        setTop(top + window.scrollY);
        setLeft(x);
        setScale(1);
      }
    }
  }, [editorState]);

  return { top, left, scale };
};
