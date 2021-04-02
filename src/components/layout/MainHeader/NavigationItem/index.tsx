import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSpring, animated } from 'react-spring';

import { useMeasure } from '@/hooks';

import styles from './style.module.scss';

type Props = {
  text: string;
  route: string;
  pathname: string;
};

export default function NavigationItem({
  text,
  route,
  pathname,
}: Props): JSX.Element {
  const [isSelected, setIsSelected] = useState<boolean>(pathname === route);

  const [{ ref }, { width }] = useMeasure();
  const props = useSpring({ width: isSelected ? width : 0 });

  useEffect(() => {
    setIsSelected(pathname === route);
  }, [pathname]);

  return (
    <li className={styles.navigationItem} ref={ref}>
      <Link href={route}>{text}</Link>
      {isSelected && (
        <animated.div
          style={props}
          className={styles.navigationItemDecorator}
        />
      )}
    </li>
  );
}
