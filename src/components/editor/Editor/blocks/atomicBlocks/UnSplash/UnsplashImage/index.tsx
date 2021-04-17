import React from 'react';

import { UnsplashImageInfo } from '@/types';

type Props = {
  unsplashImageInfo: UnsplashImageInfo;
};

import styles from './style.module.scss';
export default function UnsplashImage({ unsplashImageInfo }: Props) {
  const { regularImageSrc, userName, userProfileLink } = unsplashImageInfo;
  return (
    <div>
      <img
        src={regularImageSrc}
        alt="Unsplash Image"
        className={styles.unsplashImage}
      />
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
