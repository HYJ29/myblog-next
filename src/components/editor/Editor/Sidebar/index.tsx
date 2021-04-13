import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';

import {
  PlusCircle,
  Camera,
  Search,
  Code,
  Video,
  Minus,
} from '@/components/icons';
import { addAtomicBlock } from '@/utils';

import styles from './style.module.scss';

type Props = {
  top: number;
  left: number;
  scale: number;
  isEditorFocused: boolean;
  setEditorState: (arg0: EditorState) => void;
  editorState: EditorState;
};
export default function SideBar({
  top,
  left,
  scale,
  isEditorFocused,
  setEditorState,
  editorState,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fileUploadInputRef = useRef<HTMLInputElement>(null);

  const toggleButtonHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const onFileUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ?? [];
    const selectedFile = files[0];

    const newEditorState = addAtomicBlock({
      editorState,
      entityType: 'GENERAL_IMAGE',
      data: { selectedFile },
    });
    setEditorState(newEditorState);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isEditorFocused) {
      setIsOpen(false);
    }
  }, [isEditorFocused]);

  const subButtons = [
    {
      icon: <Minus />,
      onClick: () => {
        const newEditorState = addAtomicBlock({
          editorState,
          entityType: 'DASH',
        });
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      icon: <Code />,
      onClick: () => {
        const newEditorState = addAtomicBlock({
          editorState,
          entityType: 'CODE_BLOCK',
        });
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      icon: <Camera />,
      onClick: () => {
        fileUploadInputRef.current?.click();
      },
    },
    {
      icon: <Search />,
      onClick: () => {
        const newEditorState = addAtomicBlock({
          editorState,
          entityType: 'UNSPLASH',
        });
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
    {
      icon: <Video />,
      onClick: () => {
        const newEditorState = addAtomicBlock({
          editorState,
          entityType: 'VIDEO',
        });
        setEditorState(newEditorState);
        setIsOpen(false);
      },
    },
  ];

  return (
    <div
      className={styles.container}
      style={{
        top,
        left: left - 50,
        transform: `scale(${scale})`,
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      }}
    >
      <div className={styles.buttonContainer}>
        <div className={styles.addButton} onClick={toggleButtonHandler}>
          <PlusCircle />
        </div>
        <div className={styles.subButtons}>
          <input
            className={styles.fileUploadInput}
            type="file"
            onChange={onFileUploadHandler}
            ref={fileUploadInputRef}
          />
          {subButtons.map((button, index) => (
            <div
              key={index}
              className={styles.subButton}
              onClick={button.onClick}
              style={
                isOpen
                  ? {
                      left: 40 + index * 40,
                      opacity: 1,
                      zIndex: 1,
                    }
                  : {
                      left: 0,
                      opacity: 0,
                      zIndex: 0,
                    }
              }
            >
              <div className={styles.iconContainer}>{button.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
