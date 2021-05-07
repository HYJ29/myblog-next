import React from 'react';
import { DefaultLayout } from '@/components/layout';

import styles from './style.module.scss';

export default function AboutPage() {
  return (
    <DefaultLayout>
      <div className={styles.conatiner}>
        <ul className={styles.postListContainer}>about</ul>
      </div>
    </DefaultLayout>
  );
}
