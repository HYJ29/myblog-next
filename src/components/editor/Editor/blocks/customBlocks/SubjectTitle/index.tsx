import React from 'react';

import styles from './style.module.scss';

export default function SubjectTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h5>{children}</h5>;
}
