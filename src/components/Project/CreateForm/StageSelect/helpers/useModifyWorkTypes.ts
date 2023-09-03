import { useEffect, useState } from 'react';

import { useGetActiveWorkTypesQuery } from '../../../../../store/apis/workTypes';
import { WorkTypeStatuses } from '../../../../../store/apis/workTypes/types';

export interface ModifiedWorkType {
  name: string;
  typeWorkId: number;
  idx: number;
}

export function useModifyWorkTypes() {
  const [modifiedWorkTypes, setModifiedWorkTypes] = useState<
    ModifiedWorkType[]
  >([]);
  const [shipmentOnly, setShipmentOnly] = useState<ModifiedWorkType | null>(
    null
  );

  const { data } = useGetActiveWorkTypesQuery();

  useEffect(() => {
    if (data) {
      const shipment = data.filter(
        (workType) => workType.name === WorkTypeStatuses.SHIPMENT
      )[0];

      const workTypes = data
        .filter((workType) => workType.name !== WorkTypeStatuses.SHIPMENT)
        .map<ModifiedWorkType>((workType, index) => ({
          name: workType.name,
          typeWorkId: workType.id,
          // idx -> like id to filter array
          idx: workType.id + Math.floor(Math.random() * 50000) + index,
        }));

      const modifiedShipment: ModifiedWorkType = {
        name: shipment.name,
        typeWorkId: shipment.id,
        idx: shipment.id + Math.floor(Math.random() * 50000),
      };

      setModifiedWorkTypes([...workTypes, modifiedShipment]);
      setShipmentOnly(modifiedShipment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { modifiedWorkTypes, shipmentOnly };
}
