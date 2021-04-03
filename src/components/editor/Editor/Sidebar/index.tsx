import React, { useState } from 'react';

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
};
export default function SideBar({ top, left, scale }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleButtonHandler = (e) => {
    setIsOpen((prev) => !prev);
  };

  const icons = [<Minus />, <Code />, <Camera />, <Search />, <Video />];
  return (
    <div
      className={styles.container}
      style={{
        top,
        left: left - 50,
        transform: isOpen ? 'scale(1)' : `scale(${scale})`,
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      }}
    >
      <div className={styles.buttonContainer}>
        <div className={styles.addButton} onMouseDown={toggleButtonHandler}>
          <PlusCircle />
        </div>
        <div className={styles.subButtonConatiner}>
          {icons.map((Icon, index) => (
            <div
              key={index}
              className={styles.button}
              style={
                isOpen
                  ? {
                      left: 40 + index * 40,
                      opacity: 1,
                      transition:
                        'left 0.15s cubic-bezier(.3,1.2,.2,1), opacity .3s cubic-bezier(.3,1.2,.2,1)',
                    }
                  : {
                      left: 0,
                      opacity: 0,
                      transition:
                        'left 0.15s cubic-bezier(.3,1.2,.2,1), opacity .3s cubic-bezier(.3,1.2,.2,1)',
                    }
              }
            >
              {Icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
