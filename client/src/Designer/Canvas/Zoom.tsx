import React, {
  // useState,
  useCallback,
  useEffect,
  useRef
} from 'react';
import { clamp } from 'lodash';
import { useSpring, animated } from 'react-spring';
// import { useWheel } from 'react-use-gesture';

export default React.memo(function Zoom({
  style,
  wrapper,
  ...restProps
}: ZoomProps) {
  const [{ x, y, scale }, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1
  }));
  const prevScale = useRef<number>(1);
  const handleWheel = useCallback(
    e => {
      if (!e.metaKey && !e.ctrlKey) {
        return;
      }

      e.preventDefault();
      const factor = 0.008;
      const min = 0.3;
      const max = 5;
      const change = -(e.deltaY * factor);
      const nextScale = clamp(prevScale.current + change, min, max);
      set({ scale: nextScale });
      prevScale.current = nextScale;
    },
    [set]
  );

  useEffect(() => {
    const el = wrapper.current;
    el?.addEventListener('wheel', handleWheel, { passive: false });
    return () => el?.removeEventListener('wheel', handleWheel);
  }, [handleWheel, wrapper]);

  return (
    <animated.div
      // {...bind()}
      style={{ ...style, scale }}
      {...restProps}
    />
  );
});

type ZoomProps = React.HTMLAttributes<HTMLDivElement> & {
  wrapper: React.RefObject<HTMLDivElement>;
};
