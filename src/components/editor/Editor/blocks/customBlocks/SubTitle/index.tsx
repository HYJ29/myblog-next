import React from 'react';

import styles from './style.module.scss';

export default function SubTitle({ children }: { children: React.ReactNode }) {
  return <h4>{children}</h4>;
}
