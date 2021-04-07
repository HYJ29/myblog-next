import React from 'react';

import styles from './style.module.scss';

export default function SearchResults({ searchResults, onSelect }) {
  console.log(`searchResults`, searchResults);
  const imageRows = [
    [...searchResults.slice(0, 3)],
    [...searchResults.slice(3, 6)],
    [...searchResults.slice(6, 9)],
  ];
  return (
    <div
      className={styles.container}
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {imageRows.map((row, index) => (
        <div key={index} className={styles.rowContainer}>
          {row.map((image) => {
            console.log(`images`, image);
            const {
              thumbImageSrc,
              regularImageSrc,
              imageHeight,
              imageWidth,
              userProfileLink,
              userName,
            } = image;
            const flexValue = imageWidth / imageHeight;
            const unsplashImageInfo = {
              userProfileLink,
              userName,
              photoSrc: regularImageSrc,
            };
            return (
              <img
                className={styles.imageItem}
                src={thumbImageSrc}
                key={thumbImageSrc}
                onClick={() => {
                  onSelect({ unsplashImageInfo });
                }}
                style={{
                  flex: `${flexValue} 1 0`,
                  height: 'auto',
                  width: '1%',
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
