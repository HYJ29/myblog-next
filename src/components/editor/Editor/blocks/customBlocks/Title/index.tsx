import React from 'react';

import styles from './style.module.scss';

export default function Title({ children }: { children: React.ReactNode }) {
  return <h3>{children}</h3>;
}
