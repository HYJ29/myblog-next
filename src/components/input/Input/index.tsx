import React, { forwardRef } from 'react';

import styles from './style.module.scss';

function Input(props, ref) {
  return <input ref={ref} {...props} className={styles.input} />;
}

export default forwardRef(Input);
