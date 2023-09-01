import { useId } from 'react';
import { SortingState } from '@tanstack/react-table';
import Menu from '../../../../FilterMenu/Menu';
import MenuItem from '../../../../FilterMenu/MenuItem';
import MenuLabel from '../../../../FilterMenu/MenuLabel';

type Props = {
  sortType: SortingState;
  setSortType: React.Dispatch<React.SetStateAction<SortingState>>;
};

export function SortTypeSelect({ sortType, setSortType }: Props) {
  const sortingTypes = [
    {
      id: useId(),
      title: 'По дате договора',
      onClick: () =>
        setSortType([{ id: 'contractDate', desc: sortType[0].desc }]),
      isActive: sortType[0].id === 'contractDate',
    },
    {
      id: useId(),
      title: 'По дате отгрузки',
      onClick: () =>
        setSortType([{ id: 'shipmentDate', desc: sortType[0].desc }]),
      isActive: sortType[0].id === 'shipmentDate',
    },
    {
      id: useId(),
      title: 'По номеру проекта',
      onClick: () => setSortType([{ id: 'number', desc: sortType[0].desc }]),
      isActive: sortType[0].id === 'number',
    },
    {
      id: useId(),
      title: 'По клиенту',
      onClick: () => setSortType([{ id: 'customer', desc: sortType[0].desc }]),
      isActive: sortType[0].id === 'customer',
    },
    {
      id: useId(),
      title: 'По отклонению по срокам',
      onClick: () => setSortType([{ id: 'deviation', desc: sortType[0].desc }]),
      isActive: sortType[0].id === 'deviation',
    },
  ];

  const sortingDirections = [
    {
      id: useId(),
      title: 'По возрастанию',
      onClick: () => setSortType([{ id: sortType[0].id, desc: false }]),
      isActive: sortType[0].desc === false,
    },
    {
      id: useId(),
      title: 'По убыванию',
      onClick: () => setSortType([{ id: sortType[0].id, desc: true }]),
      isActive: sortType[0].desc,
    },
  ];

  const title = sortingTypes.find((value) => value.isActive)?.title;

  return (
    <Menu isButton closeOnItemClick title={title}>
      <MenuLabel title="Тип сортировки" />
      {sortingTypes.map((type) => (
        <MenuItem
          key={type.id}
          title={type.title}
          onClick={type.onClick}
          isActive={type.isActive}
          isCircle
        />
      ))}
      <MenuLabel title="Направление сортировки" />
      {sortingDirections.map((type) => (
        <MenuItem
          key={type.id}
          title={type.title}
          onClick={type.onClick}
          isActive={type.isActive}
          isCircle
        />
      ))}
    </Menu>
  );
}
