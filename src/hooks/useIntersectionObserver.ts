'use client';

import { RefObject, useEffect } from 'react';

/**
 * A custom hook that creates observer to fetch next page of data when given element enters the viewport.
 *
 * @param {boolean} hasNextPage - The boolean to check if there is next page of data.
 * @param {any} fetchNextPage - The function that fetches next page of data.
 * @param {RefObject<HTMLDivElement>} elementRef - The reference to element that should trigger fetchNextPage function when it enters the viewport.
 *
 */

const useIntersectionObserver = (
  hasNextPage: boolean,
  fetchNextPage: any,
  elementRef: RefObject<HTMLDivElement>,
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
      },
      { threshold: 1 },
    );

    const bottomElement = elementRef.current;
    if (bottomElement) {
      observer.observe(bottomElement);
    }

    return () => {
      if (bottomElement) {
        observer.unobserve(bottomElement);
      }
    };
  }, [elementRef, hasNextPage, fetchNextPage]);
};

export default useIntersectionObserver;
