import React, {
  useCallback,
  useEffect,
  useRef,
  useMemo
} from 'react';
import PaperSize from '../PaperSize';
import useWindowSize from '@hooks/useWindowSize';
import useKeyboard from '@hooks/useKeyboard';
import useIsMounted from '@hooks/useIsMounted';
import { clamp } from 'lodash';
import { useSpring, animated, SpringConfig } from 'react-spring';
import { assignExisting } from '@helpers';

type ZoomableProps = React.HTMLAttributes<Element> & {
  wrapper: React.RefObject<Element>;
  paperSize: PaperSize;
};

export default React.memo(function Zoomable({
  style,
  wrapper,
  paperSize,
  ...restProps
}: ZoomableProps) {
  const {
    width: windowWidth,
    height: windowHeight
  } = useWindowSize();
  const isMounted = useIsMounted();

  const [{ scale, x, y }, set] = useSpring(() => ({
    scale: 1,
    x: 0,
    y: 0,
    config: key => {
      if (key === 'scale') {
        return config.scale;
      }

      return config.position;
    }
  }));

  const state = useRef({ ...initialState });
  const transform = useCallback(
    newState => {
      if (state.current.resetting) {
        return;
      }

      set(newState);
      assignExisting(state.current, newState);
    },
    [set]
  );

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
        state.current.scale + -(e.deltaY * factor),
        min,
        max
      );

      transform({ scale: newScale });
    },
    [transform]
  );

  const handlePan = useCallback(
    e => {
      e.preventDefault();
      const factor = 1.5;
      const newX = clamp(
        state.current.x - e.deltaX * factor,
        -bounds.x,
        bounds.x
      );

      const newY = clamp(
        state.current.y - e.deltaY * factor,
        -bounds.y,
        bounds.y
      );

      transform({ x: newX, y: newY });
    },
    [transform, bounds.x, bounds.y]
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

  const reset = useCallback(() => {
    transform({
      ...initialState,
      easing: 'd3-ease',
      onRest: () => {
        setTimeout(() => {
          if (isMounted.current) {
            state.current.resetting = false;
          }
        }, 50);
      }
    });
  }, [isMounted, transform]);

  useKeyboard({ key: '0', metaKey: true }, reset);

  useEffect(() => {
    const el = wrapper.current;
    el?.addEventListener('wheel', handleWheel, {
      passive: false
    });
    return () => el?.removeEventListener('wheel', handleWheel);
  }, [handleWheel, wrapper]);

  return (
    <animated.div
      style={{ ...style, x, y, scale }}
      {...restProps}
    />
  );
});

const config: { [key: string]: SpringConfig } = {
  scale: {
    tension: 165,
    friction: 20,
    mass: 0.8
  },
  position: {
    tension: 150,
    friction: 10,
    mass: 0.1
  }
};

type ZoomState = {
  scale: number;
  x: number;
  y: number;
  resetting: boolean;
};

const initialState: ZoomState = {
  scale: 1,
  x: 0,
  y: 0,
  resetting: false
};
