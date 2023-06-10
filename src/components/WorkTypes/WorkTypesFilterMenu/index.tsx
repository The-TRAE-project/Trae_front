import { Dispatch, SetStateAction } from 'react';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import Menu from '../../FilterMenu/Menu';
import MenuLabel from '../../FilterMenu/MenuLabel';
import MenuItem from '../../FilterMenu/MenuItem';

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

interface Props {
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const WorkTypesFilterMenu = ({ status, setStatus, resetStatus }: Props) => {
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
    </Menu>
  );
};

export default WorkTypesFilterMenu;
