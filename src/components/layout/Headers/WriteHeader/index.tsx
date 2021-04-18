import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './style.module.scss';

import ControllerItem from '../Items/ControllerItem';

export default function WriteHeader() {
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
        <ControllerItem text="Save" onClick={() => {}} />
        <ControllerItem text="Publish" onClick={() => {}} />
      </ul>
    </header>
  );
}
