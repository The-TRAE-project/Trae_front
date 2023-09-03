import { Dispatch, SetStateAction } from 'react';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import { useGetAllRolesQuery } from '../../../store/apis/user';
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
  role: string | null;
  setRole: Dispatch<SetStateAction<string | null>>;
  resetRole: () => void;
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const UserFilterMenu = ({
  role,
  setRole,
  resetRole,
  status,
  setStatus,
  resetStatus,
}: Props) => {
  const { data: roles } = useGetAllRolesQuery();

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

      <MenuLabel title="Категория" />
      {!!roles &&
        Object.values(roles).map((item) => (
          <MenuItem
            key={item}
            title={item}
            onClick={() => setRole(item)}
            isActive={item === role}
          />
        ))}

      <MenuItem title="Все" onClick={resetRole} isActive={!role} />
    </Menu>
  );
};

export default UserFilterMenu;
