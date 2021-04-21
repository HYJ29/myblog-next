import React, { useState, useEffect } from 'react';

import { Button } from '@/components/button';

import styles from './style.module.scss';

type Props = {
  text: string;
  onClick: <HTMLButtonElement, MouseEvent>() => void;
};

export default function ControllerItem({ text, onClick }: Props): JSX.Element {
  return (
    <li>
      <Button children={text} onClick={onClick} style={{ margin: '0 1rem' }} />
    </li>
  );
}
