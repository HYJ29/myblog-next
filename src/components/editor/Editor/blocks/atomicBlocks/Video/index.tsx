import React, { useRef, useEffect } from 'react';
import { EditorState, ContentBlock } from 'draft-js';

import {
  getBlockDeletedEditorState,
  getReplacedEntityDataEditorState,
} from '@/utils/draft';

import styles from './style.module.scss';
import Youtube from './Youtube';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  block: ContentBlock;
  youtubeSrcInfo: any;
};

export default function Video({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  block,
  youtubeSrcInfo,
}: Props) {
  const youtubeInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!youtubeSrcInfo) {
      setIsEditorReadOnly(true);
      if (youtubeInputRef && youtubeInputRef.current) {
        youtubeInputRef.current.focus();
      }
    }
  }, []);

  const createYoutubeVideo = ({
    youtubeSrcInfo,
  }: {
    youtubeSrcInfo: string;
  }) => {
    const blockEntityKey = block.getEntityAt(0);
    const newEditorState = getReplacedEntityDataEditorState({
      data: { youtubeSrcInfo },
      editorState,
      entityKey: blockEntityKey,
    });
    setEditorState(newEditorState);
    setIsEditorReadOnly(false);
  };

  const onKeyDownHandler = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      const youtubeInputValue = youtubeInputRef.current?.value ?? '';
      createYoutubeVideo({ youtubeSrcInfo: youtubeInputValue });
    }
  };
  const onBlurHandler = async (e) => {
    setIsEditorReadOnly(false);
    const newEditorState = getBlockDeletedEditorState({ editorState, block });
    setEditorState(newEditorState);
  };

  const onFocusHandler = async (e) => {
    setIsEditorReadOnly(true);
  };
  return youtubeSrcInfo ? (
    <Youtube youtubeSrcInfo={youtubeSrcInfo} />
  ) : (
    <div className={styles.container}>
      <form className={styles.searchForm} onKeyDown={onKeyDownHandler}>
        <input
          ref={youtubeInputRef}
          className={styles.youtubeInput}
          placeholder="Paste YouTube link, and press Enter"
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
        />
      </form>
    </div>
  );
}
