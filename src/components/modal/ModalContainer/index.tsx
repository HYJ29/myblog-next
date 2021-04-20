import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTransition, animated } from 'react-spring';

export default function ModalContainer({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  const [isBrowser, setIsBrowser] = useState(false);

  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      transitions((styles, item) =>
        item ? (
          <animated.div style={{ position: 'absolute', ...styles }}>
            {children}
          </animated.div>
        ) : null
      ),
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
}
