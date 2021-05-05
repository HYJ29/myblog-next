import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring';
import { XCircle } from '@/components/icons';

import styles from './style.module.scss';

export const useLoadingModal = () => {
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const transitions = useTransition(showLoadingModal, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const LoadingModal = () => {
    if (isBrowser) {
      return ReactDOM.createPortal(
        transitions((transitionStyles, item) =>
          item ? (
            <animated.div
              className={styles.modalOverlay}
              style={transitionStyles}
            >
              <div className={styles.modalContainer}>
                {showLoadingModal.text}
              </div>
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

  return { LoadingModal, setShowLoadingModal };
};
