import { Menu } from '@mantine/core';

import { WorkType } from '../../../../../store/apis/workTypes/types';
import { SelectCircleIcon } from '../styles';

interface Props {
  workType: WorkType;
  chooseTypeWork: (name: string, typeWorkId: number) => void;
  selectedStage: string;
}

const SelectButton = ({ workType, chooseTypeWork, selectedStage }: Props) => {
  return (
    <Menu.Item onClick={() => chooseTypeWork(workType.name, workType.id)}>
      <SelectCircleIcon $isActive={selectedStage === workType.name} />
      <span>{workType.name}</span>
    </Menu.Item>
  );
};

export default SelectButton;
