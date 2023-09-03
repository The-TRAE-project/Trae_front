import { useState } from 'react';

import { setTimer } from '../../store/slices/employee';
import { useAppDispatch } from './useAppDispatch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useSlider(data: any) {
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const dispatch = useAppDispatch();

  const quantity = data?.length || 1;
  const current = slideIndex + 1;

  const nextSlide = () => {
    if (slideIndex !== data?.length) {
      setSlideIndex((prev) => prev + 1);
      dispatch(setTimer(121));
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 0) {
      setSlideIndex((prev) => prev - 1);
      dispatch(setTimer(121));
    }
  };

  return { quantity, current, slideIndex, prevSlide, nextSlide };
}
