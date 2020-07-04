import React, { useRef } from 'react';
import Zoom from './Zoom';
import Page from './Page';
import styles from './Canvas.module.scss';
import PaperSize from '../PaperSize';

export default React.memo(function Canvas() {
  const wrapper = useRef<HTMLDivElement>(null);

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <div className={styles.content}>
        <Zoom
          paperSize={PaperSize.Letter}
          wrapper={wrapper}
          className={styles.pageWrapper}
        >
          <Page paperSize={PaperSize.Letter}>
            This is some content
          </Page>
        </Zoom>
      </div>
    </div>
  );
});
