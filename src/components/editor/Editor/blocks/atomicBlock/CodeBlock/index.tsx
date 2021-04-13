import React, { useState, useEffect, useRef } from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { EditorState, ContentBlock } from 'draft-js';

import { getReplacedEntityDataEditorState } from '@/utils/draft';

import styles from './style.module.scss';

type Props = {
  setIsEditorReadOnly: (arg0: boolean) => void;
  editorState: EditorState;
  setEditorState: (ar0: EditorState) => void;
  block: ContentBlock;
  codeBlockText: string;
};

export default function CodeBlock({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  block,
  codeBlockText: codeBlockTextProps,
}: Props) {
  const [textAreaValue, setTextAreaValue] = useState('');
  const [codeBlockText, setCodeBlockText] = useState(codeBlockTextProps);
  const [showTextArea, setShowTextArea] = useState(false);
  console.log(`(codeBlockTextProps)`, codeBlockTextProps);
  useEffect(() => {
    if (!codeBlockText) {
      setShowTextArea(true);
      setTextAreaValue('');
    }
  }, []);

  const onFocusHandler = async (e) => {
    setIsEditorReadOnly(true);
  };

  const onChangeHalder = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
  };

  const onClickCodBlockHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setTextAreaValue(codeBlockText);
    setShowTextArea(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const blockEntityKey = block.getEntityAt(0);
    const newEditorState = getReplacedEntityDataEditorState({
      data: { codeBlockText: textAreaValue },
      editorState,
      entityKey: blockEntityKey,
    });
    setEditorState(newEditorState);
    setIsEditorReadOnly(false);
    setShowTextArea(false);
    setCodeBlockText(textAreaValue);
  };

  return (
    <div className={styles.container} onClick={onClickCodBlockHandler}>
      <Highlight {...defaultProps} code={textAreaValue ?? ''} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{ ...style, padding: '1rem', borderRadius: '.5rem' }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {showTextArea && (
        <>
          <textarea
            onFocus={onFocusHandler}
            onChange={onChangeHalder}
            value={textAreaValue}
          />
          <button onClick={onSubmit}>확인</button>
        </>
      )}
    </div>
  );
}
