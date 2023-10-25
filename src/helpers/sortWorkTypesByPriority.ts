import { WorkType, WorkTypeStatuses } from '../store/apis/workTypes/types';

export const sortWorkTypesByPriority = (data: WorkType[]) => {
  const shipment = data.filter(
    (it) => it.name === WorkTypeStatuses.SHIPMENT
  )[0];

  const workTypesWithoutShipment = data.filter(
    (it) => it.name !== WorkTypeStatuses.SHIPMENT
  );

  const first10WorkTypes = workTypesWithoutShipment
    .slice(0, 10)
    .sort((a, b) => a.id - b.id);

  const restWorkTypes = workTypesWithoutShipment
    .slice(10)
    .sort((a, b) => a.id - b.id);

  return shipment
    ? [...first10WorkTypes, shipment, ...restWorkTypes]
    : [...first10WorkTypes, ...restWorkTypes];
};
