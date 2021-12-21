import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from './useEventListener';

interface Size {
  width: number;
  height: number;
}

function useElementSize(ref: RefObject<HTMLElement>): [number, number] {
  // Mutable values like 'ref.current' aren't valid dependencies
  // because mutating them doesn't re-render the component.
  // Instead, we use a state as a ref to be reactive.
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });

  // Prevent too many rendering using useCallback
  const handleSize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.offsetHeight, ref.current?.offsetWidth]);

  useEventListener('resize', handleSize);

  useLayoutEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.offsetHeight, ref.current?.offsetWidth]);

  return [size.width, size.height];
}

export { useElementSize };