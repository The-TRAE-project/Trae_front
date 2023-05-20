import {
  EditWorkTypeFormValues,
  WorkType,
} from '../../../../store/apis/workTypes/types';

export const compareValues = (
  values: Omit<EditWorkTypeFormValues, 'typeWorkId'>,
  workType: WorkType
) => {
  const isWorkTypeActive = workType.isActive ? 'Активный' : 'Заблокированный';

  const findDifference = {
    newName: values.newName === workType.name ? null : values.newName,
    isActive:
      // eslint-disable-next-line no-nested-ternary
      values.isActive === isWorkTypeActive
        ? null
        : // eslint-disable-next-line no-unneeded-ternary
        values.isActive === 'Активный'
        ? true
        : false,
  };
  // eslint-disable-next-line consistent-return
  return findDifference;
};
