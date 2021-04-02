import { useRef, useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

export const useMeasure = () => {
  const ref = useRef<HTMLElement>();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );
  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => ro.disconnect();
  }, []);
  return [{ ref }, bounds];
};
