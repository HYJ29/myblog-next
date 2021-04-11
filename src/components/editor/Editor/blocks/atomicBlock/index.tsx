import React from 'react';
import { ContentState, ContentBlock, EditorState } from 'draft-js';

import UnSplash from './UnSplash';
import GeneralImage from './GeneralImage';
import Video from './Video';

type Props = {
  contentState: ContentState;
  block: ContentBlock;
  blockProps: {
    setIsEditorReadOnly: (arg0: boolean) => void;
    editorState: EditorState;
    setEditorState: (arg: EditorState) => void;
  };
};

export default function AtomicBlockComponent({
  contentState,
  block,
  blockProps,
}: Props) {
  const { setIsEditorReadOnly, editorState, setEditorState } = blockProps;
  const entity = contentState.getEntity(block.getEntityAt(0));
  const type = entity.getType();

  const data = entity.getData();

  if (type === 'UNSPLASH') {
    const { unsplashImageInfo } = data;
    return (
      <UnSplash
        setIsEditorReadOnly={setIsEditorReadOnly}
        editorState={editorState}
        setEditorState={setEditorState}
        block={block}
        unsplashImageInfo={unsplashImageInfo ?? null}
      />
    );
  }

  if (type === 'GENERAL_IMAGE') {
    const { selectedFile } = data;
    return <GeneralImage selectedFile={selectedFile} />;
  }

  if (type === 'IMAGE') {
    const { src } = data;
    return <img src={src} style={{ width: 100, height: 100 }} alt="image" />;
  }

  if (type === 'VIDEO') {
    const { youtubeSrcInfo } = data;
    return (
      <Video
        setIsEditorReadOnly={setIsEditorReadOnly}
        editorState={editorState}
        setEditorState={setEditorState}
        block={block}
        youtubeSrcInfo={youtubeSrcInfo ?? null}
      />
    );
  }

  return <div>AtomicBlockComponent</div>;
}
