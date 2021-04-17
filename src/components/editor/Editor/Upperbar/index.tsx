import React, { useState } from 'react';
import { RichUtils, EditorState } from 'draft-js';

import styles from './style.module.scss';
import LinkInput from './LinkInput';

type Props = {
  top: number;
  left: number;
  scale: number;
  // isEditorFocused: boolean;
  setEditorState: (arg0: EditorState) => void;
  editorState: EditorState;
  setIsEditorReadOnly: (arg0: boolean) => void;
};

export default function Upperbar({
  editorState,
  setEditorState,
  setIsEditorReadOnly,
  top,
  left,
  scale,
}: Props) {
  const [isLinkInputActivated, setIsLinkInputActivated] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(
    isLinkInputActivated ? true : false
  );

  const inlineButtons = [
    {
      title: 'bold',
      icon: '/icons/upperbar/bold.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      title: 'italic',
      icon: '/icons/upperbar/italic.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleInlineStyle(
          editorState,
          'ITALIC'
        );
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      title: 'link',
      icon: '/icons/upperbar/link.svg',
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLinkInputActivated(true);
        setIsOpen(true);
        setIsEditorReadOnly(true);
      },
    },
  ];

  const blocButtons = [
    {
      title: 'subject',
      icon: '/icons/upperbar/subject.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleBlockType(
          editorState,
          'header-five'
        );
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      title: 'quote',
      icon: '/icons/upperbar/quote.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleBlockType(
          editorState,
          'blockquote'
        );
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      title: 'subTitle',
      icon: '/icons/upperbar/subTitle.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleBlockType(
          editorState,
          'header-four'
        );
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      title: 'Title',
      icon: '/icons/upperbar/Title.svg',
      onClick: () => {
        const newEditorState = RichUtils.toggleBlockType(
          editorState,
          'header-three'
        );
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div
      style={{
        top,
        left: left - 50,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      }}
      className={styles.upperbarContainer}
    >
      {isLinkInputActivated ? (
        <LinkInput
          setIsLinkInputActivated={setIsLinkInputActivated}
          editorState={editorState}
          setEditorState={setEditorState}
          setIsEditorReadOnly={setIsEditorReadOnly}
        />
      ) : (
        <>
          {inlineButtons.map((button) => (
            <div className={styles.upperbarButton} key={button.title}>
              <img
                src={button.icon}
                alt={button.title}
                onMouseDown={button.onClick}
              />
            </div>
          ))}
          <div className={styles.seperator} />
          {blocButtons.map((button) => (
            <div className={styles.upperbarButton} key={button.title}>
              <img
                src={button.icon}
                alt={button.title}
                onMouseDown={button.onClick}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
