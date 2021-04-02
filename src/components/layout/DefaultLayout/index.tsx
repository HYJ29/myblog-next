import React from 'react';

import styles from './style.module.scss';
import MainHeader from '../MainHeader';

type Props = {
  children?: JSX.Element | JSX.Element[];
};

export default function DefaultLayout({ children }: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <MainHeader />
      {children}
    </div>
  );
}
