import { useEffect, useState } from 'react';
import { EditorState, getVisibleSelectionRect, ContentState } from 'draft-js';

export const useUpperbarPosition = ({
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
    // 1. get SelctionRect
    const selectionRect = getVisibleSelectionRect(window);
    console.log(`selectionRect`, selectionRect);

    // 2. get selectionState
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const startKey = selectionState.getStartKey();
    const endKey = selectionState.getEndKey();
    // const hasSeveralBlock = startKey !== endKey;
    // console.log(`hasSeveralBlock`, hasSeveralBlock);

    // let currentKey = startKey;
    // let finalMaxWidth = getBlockTextWidth({ currentKey, contentState });
    // if (hasSeveralBlock) {
    //   do {
    //     currentKey = contentState.getKeyAfter(startKey);
    //     const maxWidth = getBlockTextWidth({ currentKey, contentState });
    //     finalMaxWidth = Math.max(finalMaxWidth, maxWidth);
    //   } while (currentKey !== endKey);
    // }

    if (selectionRect && selectionRect.width > 1 && !isEditorReadOnly) {
      // const rightPosition = hasSeveralBlock
      //   ? finalMaxWidth
      //   : selectionRect.right;
      setScale(1);
      setLeft((selectionRect.left + selectionRect.right) / 2 + 50 - 150);
      setTop(selectionRect.top - 60);
    } else {
      setScale(0);
    }
  }, [editorState]);

  return { top, left, scale };
};

const getBlockTextWidth = ({
  currentKey,
  contentState,
}: {
  currentKey: string;
  contentState: ContentState;
}) => {
  const block = contentState.getBlockForKey(currentKey);
  const text = block.getText();
  const splitedText = text.split('\n');
  console.log(`splitedText`, splitedText);
  const maxLength = Math.max(...splitedText.map((text) => text.length));
  const maxWidth = 9.515625 * maxLength;
  console.log(`maxWidth`, maxWidth);
  return maxWidth;
};
