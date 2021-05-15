import React, { useState, useContext, useEffect } from 'react';
import { EditorState } from 'draft-js';

import compositeDecorator from '@/components/editor/Editor/plugins/customPlugin/decorators';
import { parseEditorState } from '@/data/utils';
import { getSubjectsFromEditorState } from '@/utils/draft/filter';
import { AuthContext } from '@/pages/_app';
import { SubjectList } from '@/components/draft';

import styles from './style.module.scss';
import PostHeader from '../Headers/PostHeader';

type Props = {
  Editor: typeof React.Component;
  rawContentState: string;
  titlePhoto: string;
  title: string;
  subTitle: string;
  owner: string;
  post: any;
};

export default function PostLayout({
  Editor,
  rawContentState,

  owner,
  post,
}: Props): JSX.Element {
  const parsedEditorState = parseEditorState(rawContentState);
  const [editorState, setEditorState] = useState(parsedEditorState);
  const [isDesktop, setIsDeskTop] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 800) {
      setIsDeskTop(true);
    }
  }, []);

  const subjectBlocks = getSubjectsFromEditorState({ editorState });
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <PostHeader editorState={editorState} owner={owner} post={post} />
      </div>
      <div className={styles.headerPlaceholder} />
      <div className={styles.editorContainer}>
        <Editor
          editorState={editorState}
          setEditorState={setEditorState}
          isPostMode={true}
        />
      </div>
      {isDesktop && (
        <div className={styles.subjectListContainer}>
          <SubjectList subjectBlocks={subjectBlocks} />
        </div>
      )}
    </div>
  );
}
