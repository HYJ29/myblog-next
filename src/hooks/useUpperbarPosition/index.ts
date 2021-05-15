import { useEffect, useState } from 'react';
import { EditorState, getVisibleSelectionRect, ContentState } from 'draft-js';

export const useUpperbarPosition = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    // 1. get SelctionRect
    const selectionRect = getVisibleSelectionRect(window);

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

    if (selectionRect && selectionRect.width > 1) {
      // const rightPosition = hasSeveralBlock
      //   ? finalMaxWidth
      //   : selectionRect.right;
      setScale(1);
      setLeft((selectionRect.left + selectionRect.right) / 2 + 50 - 150);
      setTop(selectionRect.top - 60 + window.scrollY);
    } else {
      setScale(0);
    }
  }, [editorState]);

  return { top, left, scale };
};
