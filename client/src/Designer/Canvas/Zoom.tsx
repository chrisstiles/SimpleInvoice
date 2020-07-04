import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo
} from 'react';
import PaperSize from '../PaperSize';
import useWindowSize from '@hooks/useWindowSize';
import { clamp } from 'lodash';
import { useSpring, animated } from 'react-spring';

export default React.memo(function Zoom({
  style,
  wrapper,
  paperSize,
  ...restProps
}: ZoomProps) {
  const {
    width: windowWidth,
    height: windowHeight
  } = useWindowSize();

  const [{ scale }, setScale] = useSpring(() => ({
    scale: 1,
    config: {
      tension: 165,
      friction: 20,
      mass: 0.8
    }
  }));

  const [{ x, y }, setPosition] = useSpring(() => ({
    x: 0,
    y: 0,
    config: {
      tension: 150,
      friction: 10,
      mass: 0.1
    }
  }));

  const currentScale = useRef<number>(1);
  const currentX = useRef<number>(0);
  const currentY = useRef<number>(0);

  const bounds = useMemo(() => {
    const minVisibleAmount = 100;

    const x =
      windowWidth / 2 -
      paperSize.width / 2 +
      (paperSize.width - minVisibleAmount);
    const y =
      windowHeight / 2 -
      paperSize.height / 2 +
      (paperSize.height - minVisibleAmount);

    return { x, y };
  }, [windowWidth, windowHeight, paperSize]);

  const handleZoom = useCallback(
    e => {
      e.preventDefault();
      const factor = 0.008;
      const min = 0.3;
      const max = 5;
      const newScale = clamp(
        currentScale.current + -(e.deltaY * factor),
        min,
        max
      );
      setScale({ scale: newScale });
      currentScale.current = newScale;
    },
    [setScale]
  );

  const handlePan = useCallback(
    e => {
      e.preventDefault();
      const factor = 1.5;
      const newX = clamp(
        currentX.current - e.deltaX * factor,
        -bounds.x,
        bounds.x
      );

      const newY = clamp(
        currentY.current - e.deltaY * factor,
        -bounds.y,
        bounds.y
      );

      setPosition({ x: newX, y: newY });
      currentX.current = newX;
      currentY.current = newY;
    },
    [setPosition, bounds.x, bounds.y]
  );

  const handleWheel = useCallback(
    e => {
      if (!e.metaKey && !e.ctrlKey) {
        handlePan(e);
      } else {
        handleZoom(e);
      }
    },
    [handleZoom, handlePan]
  );

  useEffect(() => {
    const el = wrapper.current;
    el?.addEventListener('wheel', handleWheel, {
      passive: false
    });
    return () => el?.removeEventListener('wheel', handleWheel);
  }, [handleWheel, wrapper]);

  return (
    <animated.div style={{ ...style, x, y, scale }} {...restProps} />
  );
});

type ZoomProps = React.HTMLAttributes<HTMLDivElement> & {
  wrapper: React.RefObject<HTMLDivElement>;
  paperSize: PaperSize;
};
