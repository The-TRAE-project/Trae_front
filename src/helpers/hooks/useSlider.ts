import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSlider(data: any) {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const quantity = data?.length || 1;
  const current = slideIndex + 1;

  const nextSlide = () => {
    if (slideIndex !== data?.length) {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  return { quantity, current, slideIndex, prevSlide, nextSlide };
}
