import React from 'react';

import styles from './style.module.scss';

export default function Title({ children }: { children: React.ReactNode }) {
  return <h3 className={styles.title}>{children}</h3>;
}
