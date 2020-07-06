import React, { useRef } from 'react';
import Zoomable from './Zoomable';
import Element from './Element';
import Page from './Page';
import styles from './Canvas.module.scss';
import PaperSize from '../PaperSize';

export default React.memo(function Canvas() {
  const wrapper = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={wrapper}
      className={styles.wrapper}
    >
      <div className={styles.content}>
        <Zoomable
          paperSize={PaperSize.Letter}
          wrapper={wrapper}
          className={styles.pageWrapper}
        >
          <Page paperSize={PaperSize.Letter}>
            <Element />
          </Page>
        </Zoomable>
      </div>
    </div>
  );
});
