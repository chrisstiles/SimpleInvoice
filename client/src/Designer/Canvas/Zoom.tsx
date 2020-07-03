import React, { useState, useCallback, useEffect } from 'react';
import { clamp } from 'lodash';

export default React.memo(function Zoom({
  style,
  wrapper,
  ...restProps
}: ZoomProps) {
  // const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const handleWheel = useCallback(
    e => {
      e.preventDefault();
      const factor = 0.008;
      const min = 0.3;
      const max = 5;
      const change = -(e.deltaY * factor);

      setZoom(currentZoom => {
        return clamp(currentZoom + change, min, max);
      });
    },
    [setZoom]
  );

  useEffect(() => {
    const el = wrapper.current;
    el?.addEventListener('wheel', handleWheel, { passive: false });
    return () => el?.removeEventListener('wheel', handleWheel);
  }, [handleWheel, wrapper]);

  return (
    <div
      style={{ ...style, transform: `scale(${zoom})` }}
      {...restProps}
    />
  );
});

type ZoomProps = React.HTMLAttributes<HTMLDivElement> & {
  wrapper: React.RefObject<HTMLDivElement>;
};
