/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { showErrorNotification } from '../showErrorNotification';

interface Error {
  data: any;
}
export function useDisplayError(error: any, isError: boolean) {
  useEffect(() => {
    const showError = () => {
      const err = error as Error;
      if (isError) {
        showErrorNotification(err?.data?.status, err?.data?.error);
      }
    };

    showError();
  }, [isError, error]);
}
