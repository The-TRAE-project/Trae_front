import { Dispatch, SetStateAction, useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import { useGetActiveWorkTypesQuery } from '../../../store/apis/workTypes';
import { LocalStorage } from '../../../constants/localStorage';
import { getItem } from '../../../helpers/getItem';
import Menu from '../../FilterMenu/Menu';
import MenuLabel from '../../FilterMenu/MenuLabel';
import MenuItem from '../../FilterMenu/MenuItem';
import { OverflowWrapper } from './styles';

const statuses = [
  {
    value: Status.ACTIVE,
    title: StatusTitle.ACTIVE,
  },
  {
    value: Status.NOT_ACTIVE,
    title: StatusTitle.BLOCKED,
  },
];

export type ModifiedWorkType = {
  id: number;
  isChecked: boolean;
  workType: string;
};
interface Props {
  typeWorks: number[] | null;
  setTypeWorks: Dispatch<SetStateAction<number[] | null>>;
  resetTypeWork: () => void;
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const EmployeesFilterMenu = ({
  typeWorks,
  setTypeWorks,
  resetTypeWork,
  status,
  setStatus,
  resetStatus,
}: Props) => {
  const [data, setData] = useLocalStorage<ModifiedWorkType[]>({
    key: LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS,
    defaultValue: [],
  });

  const { data: workTypes } = useGetActiveWorkTypesQuery();

  useEffect(() => {
    const modifiedWorkTypes = workTypes?.map((workType) => ({
      id: workType.id,
      workType: workType.name,
      isChecked: false,
    }));

    const storedData = getItem(LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS) || [];

    if (storedData?.length) {
      setData(storedData);
    } else {
      setData(modifiedWorkTypes || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workTypes]);

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
    <Menu>
      <MenuLabel title="Статус" />
      {statuses.map((item) => (
        <MenuItem
          key={item.value}
          title={item.title}
          onClick={() => setStatus(item.value)}
          isActive={item.value === status}
        />
      ))}
      <MenuItem title="Все" onClick={resetStatus} isActive={!status} />

      <MenuLabel title="Типы работ" />
      <OverflowWrapper>
        {typeWorks && (
          <>
            <MenuItem
              title="Все"
              onClick={resetTypeWork}
              isActive={typeWorks.length === 0}
            />
            {!!data &&
              data.map((workType) => (
                <MenuItem
                  key={workType.id}
                  title={workType.workType}
                  onClick={() => handleSetTypeWorks(workType)}
                  isActive={typeWorks.includes(workType.id)}
                />
              ))}
          </>
        )}
      </OverflowWrapper>
    </Menu>
  );
};

export default EmployeesFilterMenu;
