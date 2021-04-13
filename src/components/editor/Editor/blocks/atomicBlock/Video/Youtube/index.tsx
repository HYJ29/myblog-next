import React from 'react';
import styles from './style.module.scss';

export default function Youtube({
  youtubeSrcInfo,
}: {
  youtubeSrcInfo: string;
}) {
  const src = youtubeSrcInfo;
  const isWatch = src.includes('watch');
  const splitLetter = isWatch ? '=' : '/';
  const newSrc =
    'https://www.youtube.com/embed/' + src.split(splitLetter).reverse()[0];
  console.log(`newSrc`, newSrc);
  return (
    <div className={styles.container}>
      <iframe
        className={styles.youtubeIframe}
        title="youtube vidoe"
        src={newSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
