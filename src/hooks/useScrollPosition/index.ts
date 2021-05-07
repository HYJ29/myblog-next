import { mapPostAndIamges } from '@/apiHelper/image';

import React, { useRef, useLayoutEffect } from 'react';
const isBrowser = typeof window !== 'undefined';

const getScrollPosition = () => {
  if (!isBrowser) return { x: 0, y: 0 };
  const target = document.body;
  const position = target.getBoundingClientRect();

  return { x: position.left, y: position.top };
};

export const useScrollPosition = (effect, deps) => {
  const position = useRef(getScrollPosition());
  let throttleTimeout = null;

  const callBack = () => {
    const currentPosition = getScrollPosition();
    effect({ prevPosition: position.current, currentPosition });
    position.current = currentPosition;
    throttleTimeout = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      callBack();
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
};
