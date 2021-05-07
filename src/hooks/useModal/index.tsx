import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring';
import { XCircle } from '@/components/icons';
import { Button } from '@/components/button';

import styles from './style.module.scss';

type ShowModal = {
  content: React.ReactNode;
  buttonText: string;
  onButtonClick: () => void;
};

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean | ShowModal>(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const transitions = useTransition(showModal, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translate(100%)' },
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const DefaultModalContent = ({ content, buttonText, onButtonClick }) => {
    return (
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <div
            className={styles.modalXIcon}
            onClick={() => setShowModal(false)}
          >
            <XCircle />
          </div>
        </div>
        <div className={styles.modalBody}>{content}</div>
        <Button
          style={{ width: 100, alignSelf: 'center', marginTop: '1rem' }}
          onClick={() => {
            setShowModal(false);
            onButtonClick();
          }}
        >
          {buttonText}
        </Button>
      </div>
    );
  };

  const Modal = ({ children }: { children?: React.ReactNode }) => {
    if (isBrowser) {
      return ReactDOM.createPortal(
        transitions((transitionStyles, item) =>
          item ? (
            <animated.div
              className={styles.modalOverlay}
              style={transitionStyles}
            >
              {children ? (
                children
              ) : (
                <DefaultModalContent
                  content={showModal.content}
                  buttonText={showModal.buttonText}
                  onButtonClick={showModal.onButtonClick}
                />
              )}
            </animated.div>
          ) : (
            ''
          )
        ),
        document.getElementById('modal-root')!
      );
    } else {
      return null;
    }
  };

  return { Modal, setShowModal };
};
