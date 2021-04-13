import React from 'react';

import styles from './style.module.scss';

export default function Dash() {
  return (
    <div className={styles.container}>
      <div className={styles.breakLine}></div>
      <div className={styles.dashText}>log</div>
      <div className={styles.breakLine}></div>
    </div>
  );
}
