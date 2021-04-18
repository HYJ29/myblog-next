import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './style.module.scss';

import NavigationItem from '../Items/NavigationItem';

export default function MainHeader() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <header className={styles.container}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <img
            alt="logo"
            src={'/images/logo.svg'}
            className={styles.logoImage}
          />
        </div>
      </Link>
      <ul className={styles.navigationContainer}>
        <NavigationItem text="HOME" route="/" pathname={pathname} />
        <NavigationItem text="ABOUT" route="/about" pathname={pathname} />
        <NavigationItem text="WHO ARE YOU" route="/auth" pathname={pathname} />
        <NavigationItem text="WRITE" route="/post/write" pathname={pathname} />
      </ul>
    </header>
  );
}
