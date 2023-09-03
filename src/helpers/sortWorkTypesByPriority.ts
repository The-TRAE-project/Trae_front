import { WorkType, WorkTypeStatuses } from '../store/apis/workTypes/types';

export const sortWorkTypesByPriority = (data: WorkType[]) => {
  const shipment = data.filter(
    (it) => it.name === WorkTypeStatuses.SHIPMENT
  )[0];

  const first10WorkTypes = data
    .filter((it) => it.name !== WorkTypeStatuses.SHIPMENT)
    .slice(0, 10)
    .sort((a, b) => a.id - b.id);

  const restWorkTypes = data.slice(10);

  return shipment
    ? [...first10WorkTypes, shipment, ...restWorkTypes]
    : [...first10WorkTypes, ...restWorkTypes];
};
