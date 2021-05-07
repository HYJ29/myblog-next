import React from 'react';

import styles from './style.module.scss';

export default function BlockQuote({
  children,
}: {
  children: React.ReactNode;
}) {
  return <blockquote className={styles.container}>{children}</blockquote>;
}
