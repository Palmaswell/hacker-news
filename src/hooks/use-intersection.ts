import { useEffect, useState, useRef, RefObject } from 'react';

export interface IntersectionOptions {
  readonly threshold: number | number[];
  readonly rootMargin?: string;
  readonly root?: Element | null;
}

export function useIntersection<T>(
  options: IntersectionOptions,
): { ref: RefObject<T>; entry: IntersectionObserverEntry } {
  const [entry, setEntry] = useState({} as IntersectionObserverEntry);
  const ref = useRef<T>(null);
  const observer = useRef(
    new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => setEntry(entry),
      options,
    ),
  );

  useEffect(() => {
    if (ref.current) {
      observer.current.observe((ref?.current as unknown) as Element);
    }
    return () => observer.current.disconnect();
  }, []);
  return { ref, entry };
}
