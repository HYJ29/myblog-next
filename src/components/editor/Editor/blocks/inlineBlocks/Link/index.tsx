import React from 'react';

import styles from './style.module.scss';

export default function Link({ contentState, entityKey, children }) {
  const { url } = contentState.getEntity(entityKey).getData();
  console.log(`url`, url);
  return (
    <a
      href={url}
      className={styles.link}
      onClick={() => {
        console.log('link clicked');
      }}
      target="_blank"
    >
      {children}
    </a>
  );
}
