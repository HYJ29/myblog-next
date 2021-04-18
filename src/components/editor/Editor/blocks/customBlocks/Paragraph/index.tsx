import React from 'react';

import styles from './style.module.scss';

export default function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className={styles.paragraph}>{children}</p>;
}
