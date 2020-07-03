import React, { useRef } from 'react';
import Zoom from './Zoom';
import styles from './Canvas.module.scss';

export default React.memo(function Canvas() {
  const wrapper = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <Zoom wrapper={wrapper} className={styles.content}>
        <div className={styles.pageWrapper}>
          <div className={styles.page}>
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            <br />
            <br />
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
            This is my template
            <br />
          </div>
        </div>
      </Zoom>
    </div>
  );
});
