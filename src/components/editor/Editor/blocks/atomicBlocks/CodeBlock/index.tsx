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
  isPostMode: boolean;
};

export default function CodeBlock({
  setIsEditorReadOnly,
  editorState,
  setEditorState,
  block,
  codeBlockText: codeBlockTextProps,
  isPostMode,
}: Props) {
  const [codeBlockText, setCodeBlockText] = useState(codeBlockTextProps ?? '');
  const [textAreaValue, setTextAreaValue] = useState(codeBlockText ?? '');
  const [showTextArea, setShowTextArea] = useState(false);

  const textAreaInputRef = useRef<HTMLTextAreaElement | null>(null);

  const focusOnTextArea = () => {
    if (textAreaInputRef && textAreaInputRef.current) {
      textAreaInputRef.current.focus();
      textAreaInputRef.current.selectionStart =
        textAreaInputRef.current.value.length;
    }
  };

  useEffect(() => {
    if (showTextArea) {
      focusOnTextArea();
    }
  }, [showTextArea]);

  const onFocusTextAreaHandler = async (e) => {
    setIsEditorReadOnly(true);
  };

  const onBlurTextAreaHandler = async (e) => {
    setIsEditorReadOnly(false);
  };

  const onChangeHalder = (e) => {
    const value = e.target.value;
    setTextAreaValue(value);
  };

  const onClickCodBlockHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (showTextArea) {
      setShowTextArea(false);
      finishCodeEdit();
    } else {
      setTextAreaValue(codeBlockText);
      await setShowTextArea(true);
      focusOnTextArea();
    }
  };

  const finishCodeEdit = () => {
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

  const onKeyDownHandler = async (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      finishCodeEdit();
    }
  };

  return (
    <div className={styles.container}>
      <Highlight {...defaultProps} code={textAreaValue ?? ''} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              padding: '1rem',
              borderRadius: '.5rem',
              cursor: isPostMode ? 'default' : 'pointer',
              overflow: 'scroll',
            }}
            onClick={isPostMode ? () => {} : onClickCodBlockHandler}
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
            className={styles.textAreaInput}
            onFocus={onFocusTextAreaHandler}
            onBlur={onBlurTextAreaHandler}
            onChange={onChangeHalder}
            value={textAreaValue}
            ref={textAreaInputRef}
            onKeyDown={onKeyDownHandler}
            placeholder="Put code and press shift + Enter."
          />
          {/* <button onClick={onSubmit}>확인</button> */}
        </>
      )}
    </div>
  );
}
