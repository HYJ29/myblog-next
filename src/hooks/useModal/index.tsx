import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring';

import styles from './style.module.scss';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const transitions = useTransition(showModal, {
    from: { transform: 'translateY(100%)' },
    enter: { transform: 'translateY(0%)' },
    leave: { transform: 'translate(100%)' },
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const Modal = ({ children }: { children: React.ReactNode }) => {
    if (isBrowser) {
      return ReactDOM.createPortal(
        transitions((transitionStyles, item) =>
          item ? (
            <animated.div
              className={styles.modalOverlay}
              style={transitionStyles}
            >
              {children}
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
