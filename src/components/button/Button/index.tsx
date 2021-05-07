import React, { useState, useEffect } from 'react';

import styles from './style.module.scss';

type Props = {
  children: React.ReactNode;
  onClick: <HTMLButtonElement, MouseEvent>() => void;
  style?: any;
};

export default function Button({
  children,
  onClick,
  style,
}: Props): JSX.Element {
  return (
    <button onClick={onClick} className={styles.button} style={style}>
      {children}
    </button>
  );
}
