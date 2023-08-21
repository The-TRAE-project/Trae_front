import { useId } from 'react';
import { SortingState } from '@tanstack/react-table';
import Menu from '../../../../FilterMenu/Menu';
import MenuItem from '../../../../FilterMenu/MenuItem';

type Props = {
  sortType: SortingState;
  setSortType: React.Dispatch<React.SetStateAction<SortingState>>;
};

export function SortTypeSelect({ sortType, setSortType }: Props) {
  const filterValues = [
    {
      id: useId(),
      title: 'По дате договора',
      onClick: () => setSortType([{ id: 'contractDate', desc: false }]),
      isActive: sortType[0].id === 'contractDate',
    },
    {
      id: useId(),
      title: 'По дате отгрузки',
      onClick: () => setSortType([{ id: 'shipmentDate', desc: false }]),
      isActive: sortType[0].id === 'shipmentDate',
    },
    {
      id: useId(),
      title: 'По номеру проекта',
      onClick: () => setSortType([{ id: 'number', desc: false }]),
      isActive: sortType[0].id === 'number',
    },
    {
      id: useId(),
      title: 'По клиенту',
      onClick: () => setSortType([{ id: 'customer', desc: false }]),
      isActive: sortType[0].id === 'customer',
    },
    {
      id: useId(),
      title: 'По отклонению по срокам',
      onClick: () => setSortType([{ id: 'deviation', desc: false }]),
      isActive: sortType[0].id === 'deviation',
    },
  ];

  return (
    <Menu isButton>
      {/* onClick={onClearInput}> */}
      {filterValues.map((filterValue) => (
        <MenuItem
          key={filterValue.id}
          title={filterValue.title}
          onClick={filterValue.onClick}
          isActive={filterValue.isActive}
          isCircle
        />
      ))}
    </Menu>
  );
}
