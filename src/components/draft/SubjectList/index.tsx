import React from 'react';
import Link from 'next/link';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import styles from './style.module.scss';

export default function SubjectList({ subjectBlocks }) {
  console.log(`subjectBlocks`, subjectBlocks);
  return (
    <ul className={styles.container}>
      {subjectBlocks.map((block) => (
        <AnchorLink key={block.key} href={`#${block.key}`} offset={80}>
          <li className={styles.subjectLink}>{block.text}</li>
        </AnchorLink>
      ))}
    </ul>
  );
}
