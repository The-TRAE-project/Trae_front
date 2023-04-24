import { useEffect, useState } from 'react';

import { useGetActiveWorkTypesQuery } from '../../../../../store/apis/workTypes';

export interface ModifiedWorkType {
  name: string;
  typeWorkId: number;
  idx: number;
}

export function useModifyWorkTypes() {
  const [modifiedWorkTypes, setModifiedWorkTypes] = useState<
    ModifiedWorkType[]
  >([]);

  const { data } = useGetActiveWorkTypesQuery();

  useEffect(() => {
    if (data) {
      const workTypes = data.map<ModifiedWorkType>((workType) => ({
        name: workType.name,
        typeWorkId: workType.id,
        // idx -> like id to filter array
        idx: Math.floor(workType.id + Math.random() * 1000),
      }));
      setModifiedWorkTypes(workTypes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return modifiedWorkTypes;
}
