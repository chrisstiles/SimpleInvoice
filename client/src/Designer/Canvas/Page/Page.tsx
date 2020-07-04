import React from 'react';
import PaperSize from '../../PaperSize';
import classNames from 'classnames';
import styles from './Page.module.scss';

export default function Page({
  paperSize,
  style,
  className,
  ...restProps
}: PageProps) {
  return (
    <div
      className={classNames(className, styles.page)}
      style={{
        ...style,
        width: paperSize.width,
        height: paperSize.height
      }}
      {...restProps}
    />
  );
}

type PageProps = React.HTMLAttributes<HTMLDivElement> & {
  paperSize: PaperSize;
};
