import React from 'react';
import { Editor } from '@/components/editor';
import { WriteLayout } from '@/components/layout';

import styles from './style.module.scss';
export default function PostWritePage() {
  return (
    <WriteLayout>
      <div className={styles.container}>
        <div className={styles.editorContainer}>
          <Editor />
        </div>
      </div>
    </WriteLayout>
  );
}
