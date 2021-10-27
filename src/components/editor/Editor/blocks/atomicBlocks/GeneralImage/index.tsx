import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import BeatLoader from 'react-spinners/BeatLoader';

import colors from '@/styles/colors.module.scss';

import styles from './style.module.scss';

export default function GeneralImage({ imageUrl }) {
  return imageUrl ? (
    <div className={styles.imageContainer}>
      <div className={styles.image}>
        <Image
          layout="fill"
          objectFit="contain"
          src={imageUrl}
          alt="local image"
        />
      </div>
    </div>
  ) : (
    <div className={styles.imageContainer}>
      <BeatLoader color={colors.colorPrimary500} />
    </div>
  );
}
