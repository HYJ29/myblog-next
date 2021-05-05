import React from 'react';

import styles from './style.module.scss';

export default function SubjectTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  const key = children.key;
  return (
    <section id={key}>
      <h5 className={styles.subjectTitle}>{children}</h5>
    </section>
  );
}
