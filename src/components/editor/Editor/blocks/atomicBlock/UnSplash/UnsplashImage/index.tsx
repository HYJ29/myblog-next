import React from 'react';

import styles from './style.module.scss';
export default function UnsplashImage({ src }) {
  return (
    <img src={src} alt="Unsplash Image" className={styles.unsplashImage} />
  );
}
