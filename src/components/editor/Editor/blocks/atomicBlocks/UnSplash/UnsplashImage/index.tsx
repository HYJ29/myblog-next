import React from 'react';
import Image from 'next/image';

import { UnsplashImageInfo } from '@/types';

type Props = {
  unsplashImageInfo: UnsplashImageInfo;
};

import styles from './style.module.scss';
export default function UnsplashImage({ unsplashImageInfo }: Props) {
  const { regularImageSrc, userName, userProfileLink } = unsplashImageInfo;
  return (
    <div>
      <div className={styles.unsplashImageContainer}>
        <div className={styles.unsplashImage}>
          <Image
            src={regularImageSrc}
            alt="Unsplash Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.captionContainer}>
        <span className={styles.captionText}>Photo by </span>
        <a
          className={styles.captionLink}
          href={`${userProfileLink}?utm_source=your_app_name&utm_medium=referral`}
          target="_blank"
        >
          {userName}
        </a>
        <span className={styles.captionText}> on </span>
        <a
          className={styles.captionLink}
          href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral"
          target="_blank"
        >
          Unsplash
        </a>
      </div>
    </div>
  );
}
