import React from 'react';
import Tools from './Tools';
import Canvas from './Canvas';
import styles from './Designer.module.scss';

export default function Designer() {
  return (
    <div className={styles.wrapper} tabIndex={0}>
      <Tools />
      <Canvas />
    </div>
  );
}
