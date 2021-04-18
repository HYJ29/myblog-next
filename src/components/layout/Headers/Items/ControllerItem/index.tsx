import React, { useState, useEffect } from 'react';

import styles from './style.module.scss';

type Props = {
  text: string;
  onClick: <HTMLButtonElement, MouseEvent>() => void;
};

export default function ControllerItem({ text, onClick }: Props): JSX.Element {
  return (
    <li>
      <button onClick={onClick} className={styles.controllerItem}>
        {text}
      </button>
    </li>
  );
}
