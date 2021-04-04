import React, { useState, useEffect } from 'react';

import {
  PlusCircle,
  Camera,
  Search,
  Code,
  Video,
  Minus,
} from '@/components/icons';

import styles from './style.module.scss';

type Props = {
  top: number;
  left: number;
  scale: number;
  isEditorFocused: boolean;
};
export default function SideBar({ top, left, scale, isEditorFocused }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleButtonHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isEditorFocused) {
      setIsOpen(false);
    }
  }, [isEditorFocused]);

  const icons = [<Minus />, <Code />, <Camera />, <Search />, <Video />];

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
          {icons.map((Icon, index) => (
            <div
              key={index}
              className={styles.subButton}
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
              <div className={styles.iconContainer}>{Icon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
