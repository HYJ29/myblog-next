import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';

export default function GeneralImage({ selectedFile }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const reader = new FileReader();
  reader.onload = (e) => {
    if (e.target?.result) {
      setImageUrl(e.target.result);
    }
  };
  reader.readAsDataURL(selectedFile);
  return imageUrl ? (
    <div>
      <img className={styles.image} src={imageUrl} alt="local image" />
    </div>
  ) : (
    <div>loading...</div>
  );
}
