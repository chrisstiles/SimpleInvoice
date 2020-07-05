import { useEffect, useRef } from 'react';

type KeyboardEventOptions = {
  element?: HTMLElement | Window | Document;
  name?: 'keydown' | 'keyup' | 'keypress';
  key: string;
  shiftKey?: boolean;
  metaKey?: boolean;
};

export default function useKeyboard(
  {
    name = 'keydown',
    element = window,
    key,
    shiftKey,
    metaKey
  }: KeyboardEventOptions,
  callback: (e: KeyboardEvent) => void
) {
  const callbackRef = useRef((e: KeyboardEvent) => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler: any = (e: KeyboardEvent) => {
      if (
        e.key !== key ||
        (shiftKey && !e.shiftKey) ||
        (metaKey && !e.metaKey && !e.ctrlKey)
      ) {
        return;
      }
      callbackRef.current(e);
    };

    element.addEventListener(name, handler);
    return () => element.removeEventListener(name, handler);
  }, [callback, element, key, metaKey, name, shiftKey]);
}
