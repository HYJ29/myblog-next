import React from 'react';

import styles from './style.module.scss';
export default function HashTag({ children }) {
  return <span className={styles.tag}>{children}</span>;
}
