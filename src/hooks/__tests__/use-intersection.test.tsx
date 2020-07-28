import React from 'react';
import { act, render } from '@testing-library/react';
import { useIntersection, IntersectionOptions } from '..';

const Component: React.FC = () => {
  const { ref, entry } = useIntersection<HTMLDivElement>({
    threshold: 1.0,
  });

  return (
    <div data-testid="test-component" ref={ref}>
      {entry && entry.intersectionRatio}
    </div>
  );
};

describe('useIntersection()', () => {
  let instances: Map<Element, Partial<IntersectionObserver>>;
  let callbacks: Map<Element, (entry: IntersectionObserverEntry[]) => void>;

  beforeEach(() => {
    instances = new Map();
    callbacks = new Map();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest.fn((cb, options: IntersectionOptions) => {
        const instance = {
          thresholds: Array.isArray(options.threshold)
            ? options.threshold
            : [options.threshold],
          root: options.root,
          rootMargin: options.rootMargin,
          observe: jest.fn((element: Element) => {
            callbacks.set(element, cb);
            instances.set(element, instance);
          }),
          disconnect: jest.fn(),
        };
        return instance;
      }),
    });
  });

  afterEach(() => {
    ((window.IntersectionObserver as unknown) as Partial<
      IntersectionObserver
    > & {
      mockClear: () => void;
    }).mockClear();
    instances = (undefined as unknown) as Map<Element, IntersectionObserver>;
    callbacks = (undefined as unknown) as Map<Element, () => void>;
  });

  it('should have been called with the right DOM reference', () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('test-component');
    const instance = instances.get(el) as Partial<IntersectionObserver>;

    expect(instance.observe).toHaveBeenCalledWith(el);
  });

  it('should return the IntersectionEntry on intersecting', () => {
    const { getByTestId } = render(<Component />);
    const el = getByTestId('test-component');
    const instance = instances.get(el) as Partial<IntersectionObserver>;
    const callback = callbacks.get(el) as (
      entry: Partial<IntersectionObserverEntry>[],
    ) => void;
    const entry = [
      {
        boundingClientRect: el.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: el.getBoundingClientRect(),
        isIntersecting: true,
        rootBounds: instance.root ? instance.root.getBoundingClientRect() : {},
        target: el,
      } as Partial<IntersectionObserverEntry>,
    ];
    expect(el.innerHTML).toBe('');
    act(() => callback(entry));
    expect(el.innerHTML).toBe('1');
  });
});
