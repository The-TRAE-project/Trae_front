import { useId } from 'react';
import { SortingState } from '@tanstack/react-table';
import Menu from '../../../../FilterMenu/Menu';
import MenuItem from '../../../../FilterMenu/MenuItem';

type Props = {
  sortType: SortingState;
  setSortType: React.Dispatch<React.SetStateAction<SortingState>>;
};

export function SortTypeSelect({ sortType, setSortType }: Props) {
  const sortingTypes = [
    {
      id: useId(),
      title: 'По дате договора по возрастанию',
      onClick: () => setSortType([{ id: 'contractDate', desc: false }]),
      isActive: sortType[0].id === 'contractDate' && !sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По дате договора по убыванию',
      onClick: () => setSortType([{ id: 'contractDate', desc: true }]),
      isActive: sortType[0].id === 'contractDate' && sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По дате отгрузки по возрастанию',
      onClick: () => setSortType([{ id: 'shipmentDate', desc: false }]),
      isActive: sortType[0].id === 'shipmentDate' && !sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По дате отгрузки по убыванию',
      onClick: () => setSortType([{ id: 'shipmentDate', desc: true }]),
      isActive: sortType[0].id === 'shipmentDate' && sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По номеру проекта по возрастанию',
      onClick: () => setSortType([{ id: 'number', desc: false }]),
      isActive: sortType[0].id === 'number' && !sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По номеру проекта по убыванию',
      onClick: () => setSortType([{ id: 'number', desc: true }]),
      isActive: sortType[0].id === 'number' && sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По клиенту по возрастанию',
      onClick: () => setSortType([{ id: 'customer', desc: false }]),
      isActive: sortType[0].id === 'customer' && !sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По клиенту по убыванию',
      onClick: () => setSortType([{ id: 'customer', desc: true }]),
      isActive: sortType[0].id === 'customer' && sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По отклонению по срокам по возрастанию',
      onClick: () => setSortType([{ id: 'deviation', desc: false }]),
      isActive: sortType[0].id === 'deviation' && !sortType[0].desc,
    },
    {
      id: useId(),
      title: 'По отклонению по срокам по убыванию',
      onClick: () => setSortType([{ id: 'deviation', desc: true }]),
      isActive: sortType[0].id === 'deviation' && sortType[0].desc,
    },
  ];

  const title = sortingTypes.find((value) => value.isActive)?.title;

  return (
    <Menu isButton closeOnItemClick title={title}>
      {sortingTypes.map((type) => (
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
