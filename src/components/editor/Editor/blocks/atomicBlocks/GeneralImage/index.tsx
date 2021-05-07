import React, { useEffect, useState } from 'react';

import styles from './style.module.scss';

export default function GeneralImage({ imageUrl }) {
  // const reader = new FileReader();
  // reader.onload = (e) => {
  //   if (e.target?.result) {
  //     setImageUrl(e.target.result);
  //   }
  // };
  // // console.log(`selectedFile`, selectedFile);
  // // console.log(`imageUrl`, imageUrl);
  // reader.readAsDataURL(selectedFile);
  return imageUrl ? (
    <div>
      <img className={styles.image} src={imageUrl} alt="local image" />
    </div>
  ) : (
    <div>loading...</div>
  );
}
