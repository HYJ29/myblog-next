import { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';

export const useSidebarPosition = ({
  editorState,
}: {
  editorState: EditorState;
}) => {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    console.log('useSidebar Hook');
    const windowSelection = window.getSelection();
    const anchorNode = windowSelection?.anchorNode;
    console.log(`anchorNode`, anchorNode);
    if (anchorNode && anchorNode.ELEMENT_NODE && anchorNode.attributes) {
      const dataOffsetKey = anchorNode.attributes['data-offset-key']?.value;
      // Find the most parent node with same data-offset-key
      const blockNode = document.querySelector(
        `[data-offset-key="${dataOffsetKey}"]`
      );
      if (blockNode) {
        console.log('hasblock node');
        const blockNodeRect = blockNode.getBoundingClientRect();
        const { x, top } = blockNodeRect;
        setTop(top);
        setLeft(x);
        setScale(1);
      }
    } else {
      console.log('no block node');
      setScale(0);
    }
  }, [editorState]);

  return { top, left, scale };
};
