import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

import color from '@/styles/colors.module.scss';

import styles from './styles.module.scss';

export default function Loader() {
  return (
    <div className={styles.fallbackContainer}>
      <BeatLoader color={color.colorPrimary500} />
    </div>
  );
}
