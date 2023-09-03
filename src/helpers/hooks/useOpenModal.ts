import { SetStateAction, useEffect } from 'react';

export function useOpenModal(
  setIsOpen: (value: SetStateAction<boolean>) => void,
  isSuccess: boolean
) {
  useEffect(() => {
    if (isSuccess) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
}
