import React from 'react';

import styles from './style.module.scss';

export default function SearchResults({ searchResults }) {
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
            const { thumbImageSrc, imageHeight, imageWidth } = image;
            const flexValue = imageWidth / imageHeight;
            return (
              <img
                className={styles.imageItem}
                src={thumbImageSrc}
                key={thumbImageSrc}
                onClick={() => {}}
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
