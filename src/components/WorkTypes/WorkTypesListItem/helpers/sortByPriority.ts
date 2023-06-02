import {
  WorkType,
  WorkTypeStatuses,
} from '../../../../store/apis/workTypes/types';

export const sortByPriority = (data: WorkType[]) => {
  const shipment = data.filter(
    (it) => it.name === WorkTypeStatuses.SHIPMENT
  )[0];

  const first10WorkTypes = data
    .filter((it) => it.name !== WorkTypeStatuses.SHIPMENT)
    .slice(0, 10)
    .sort((a, b) => a.id - b.id);

  const restWorkTypes = data.slice(10);

  return [...first10WorkTypes, shipment, ...restWorkTypes];
};
