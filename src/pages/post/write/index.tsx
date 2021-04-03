import React from 'react';
import { Editor } from '@/components/editor';

import styles from './style.module.scss';
export default function PostWritePage() {
  return (
    <div className={styles.container}>
      <div className={styles.editorContainer}>
        <Editor />
      </div>
    </div>
  );
}
