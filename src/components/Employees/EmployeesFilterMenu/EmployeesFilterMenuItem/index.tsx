import { Dispatch, SetStateAction } from 'react';
import { Menu, Checkbox } from '@mantine/core';

import {
  FilterMenuItemGroup,
  FilterMenuItemTitle,
  useCheckboxStyles,
} from '../../../styles';
import { ModifiedWorkType } from '..';

interface Props {
  workType: ModifiedWorkType;
  typeWorks: number[] | null;
  setTypeWorks: Dispatch<SetStateAction<number[] | null>>;
  data: ModifiedWorkType[];
  setData: Dispatch<SetStateAction<ModifiedWorkType[]>>;
}

const EmployeesFilterMenuItem = ({
  workType,
  typeWorks,
  setTypeWorks,
  data,
  setData,
}: Props) => {
  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();

  const handleSetTypeWorks = (typeWork: ModifiedWorkType) => {
    if (!typeWork.isChecked) {
      const newTypeWorks = typeWorks?.concat(typeWork.id) || [];
      setTypeWorks(newTypeWorks);
      setData(
        data.map((item) =>
          item.id === typeWork.id ? { ...item, isChecked: true } : item
        )
      );
    } else if (typeWork.isChecked) {
      const newTypeWorks =
        typeWorks?.filter((item) => item !== typeWork.id) || [];
      setTypeWorks(newTypeWorks);
      setData(
        data.map((item) =>
          item.id === typeWork.id ? { ...item, isChecked: false } : item
        )
      );
    }
  };

  return (
    <Menu.Item onClick={() => handleSetTypeWorks(workType)}>
      <FilterMenuItemGroup>
        <Checkbox
          readOnly
          checked={typeWorks?.includes(workType.id)}
          classNames={{ input, inner, icon }}
        />
        <FilterMenuItemTitle $active={typeWorks?.includes(workType.id)}>
          {workType.workType}
        </FilterMenuItemTitle>
      </FilterMenuItemGroup>
    </Menu.Item>
  );
};

export default EmployeesFilterMenuItem;
