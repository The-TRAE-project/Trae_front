import { Menu } from '@mantine/core';

import { Operation } from '../../../../../store/apis/project/types';
import { WorkTypeStatuses } from '../../../../../store/apis/workTypes/types';
import { ModifiedWorkType } from '../helpers/useModifyWorkTypes';
import { NotActiveCircle } from '../styles';

interface Props {
  workType: ModifiedWorkType;
  handleSelectOperation: (workType: Operation, idx: number) => void;
  checkIsOperationSelected: (idx: number) => JSX.Element;
}

const SelectButton = ({
  workType,
  handleSelectOperation,
  checkIsOperationSelected,
}: Props) => {
  const { name, typeWorkId, idx } = workType;

  return (
    <Menu.Item
      type="button"
      onClick={() => handleSelectOperation({ name, typeWorkId }, idx)}
      disabled={name === WorkTypeStatuses.SHIPMENT}
    >
      {name === WorkTypeStatuses.SHIPMENT ? (
        <NotActiveCircle $isActive={name === WorkTypeStatuses.SHIPMENT} />
      ) : (
        checkIsOperationSelected(idx)
      )}
      <span>{name}</span>
    </Menu.Item>
  );
};

export default SelectButton;
