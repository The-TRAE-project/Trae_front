import { Dispatch, SetStateAction, useEffect } from 'react';

import { ModifiedWorkType } from './useModifyWorkTypes';

export function useSetShipmentOperation(
  opened: boolean,
  shipmentOnly: ModifiedWorkType | null,
  selectedOperations: ModifiedWorkType[],
  setSelectedOperations: Dispatch<SetStateAction<ModifiedWorkType[]>>,
  ids: number[],
  setIds: Dispatch<SetStateAction<number[]>>
) {
  useEffect(() => {
    if (!shipmentOnly) return;

    if (!opened && selectedOperations.length > 0) {
      setSelectedOperations((prevState) => [...prevState, shipmentOnly]);
      setIds((prevState) => [...prevState, shipmentOnly.idx]);
    } else if (opened) {
      const filteredOperations =
        selectedOperations?.filter((it) => it.idx !== shipmentOnly.idx) || [];
      setSelectedOperations(filteredOperations);
      const filteredIds = ids?.filter((it) => it !== shipmentOnly.idx) || [];
      setIds(filteredIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);
}
