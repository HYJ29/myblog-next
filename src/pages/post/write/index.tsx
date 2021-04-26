import React from 'react';
import { Editor } from '@/components/editor';
import { WriteLayout } from '@/components/layout';

import styles from './style.module.scss';
export default function PostWritePage() {
  // TODO : local storage 에 editorState 있으면 hydrate 하기

  return <WriteLayout Editor={Editor} />;
}
