import React from 'react';

import styles from './style.module.scss';
import WriteHeader from '../Headers/WriteHeader';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function WriteLayout({ children }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <WriteHeader />
      </div>

      <div className={styles.headerPlaceholder} />
      {children}
    </div>
  );
}
