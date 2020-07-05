import { useState, useEffect, useRef } from 'react';

type WindowSize = {
  width: number;
  height: number;
};

export default function useWindowSize(
  callback?: (size: WindowSize) => void
): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const prevSize = useRef({ ...size });

  useEffect(() => {
    const handler = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (
        prevSize.current.width !== width ||
        prevSize.current.height !== height
      ) {
        const newSize = { width, height };
        prevSize.current = newSize;

        if (callback) {
          callback(newSize);
        }

        setSize(newSize);
      }
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [callback]);

  return size;
}
