import React, { useEffect, useRef } from 'react';
import styles from './Canvas.module.scss';

export default function Canvas() {
  const wrapper = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const el = wrapper.current;
    const handler = (e: WheelEvent) => {
      // e.preventDefault();
      // console.log(e);
      // e.stopImmediatePropagation();
    };

    el.addEventListener('wheel', handler, {
      capture: true
      // passive: true
    });

    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <div className={styles.content}>
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
      </div>
    </div>
  );
}
