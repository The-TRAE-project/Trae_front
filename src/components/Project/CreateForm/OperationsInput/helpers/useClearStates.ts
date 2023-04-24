import { useEffect } from 'react';

export function useClearStates(
  isSuccess: boolean,
  handleClearStates: () => void
) {
  useEffect(() => {
    if (isSuccess) {
      handleClearStates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);
}
