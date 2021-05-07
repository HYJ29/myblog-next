import React from 'react';

import styles from './style.module.scss';

export default function Paragraph({ children }: { children: React.ReactNode }) {
  return <div className={styles.paragraph}>{children}</div>;
}
