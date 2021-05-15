import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
  // const router = useRouter();
  // const { pathname } = router;
  const [isSelected, setIsSelected] = useState<boolean>(pathname === route);

  const [{ ref }, { width }] = useMeasure<HTMLLIElement>();

  const props = useSpring({ width: isSelected ? width : 0 });

  useEffect(() => {
    setIsSelected(pathname === route);
  }, [pathname]);

  return (
    <div className={styles.navigationItem} ref={ref}>
      <div className={styles.navigationItemText}>
        <Link href={route}>{text}</Link>
      </div>
      {isSelected && (
        <animated.div
          style={props}
          className={styles.navigationItemDecorator}
        />
      )}
    </div>
  );
}
