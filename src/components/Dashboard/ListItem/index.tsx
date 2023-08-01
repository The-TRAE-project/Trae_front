import Item from './Item';
import { Wrapper } from './styles';
import { useGetDashboardReportQuery } from '../../../store/apis/reports';

export type DashboardListItem = {
  id: string;
  title: string;
  quantity: number | undefined;
};

// TODO: add loading spinner, placeholder for failing to load and reload on timer
const ListItem = () => {
  const {
    data: dashboardReport,
    isLoading: isGetLoading,
    isFetching,
  } = useGetDashboardReportQuery();

  const list: DashboardListItem[] = [
    {
      id: '1',
      title: 'Проектов в системе',
      quantity: dashboardReport?.countNotEndedProjects,
    },
    {
      id: '2',
      title: 'Проектов готовых к отгрузке',
      quantity: dashboardReport?.countProjectsWithLastOpReadyToAcceptance,
    },
    {
      id: '3',
      title: 'Сотрудников на смене',
      quantity: dashboardReport?.countEmpsOnActiveWorkingShift,
    },
    {
      id: '4',
      title: 'Просроченных проектов по этапу',
      quantity: dashboardReport?.countProjectsWithOverdueCurrentOperation,
    },
    {
      id: '5',
      title: 'Просроченных проектов',
      quantity: dashboardReport?.countOverdueProjects,
    },
  ];

  return (
    <Wrapper>
      {list.map((item) => (
        <Item key={item.id} project={item} />
      ))}
    </Wrapper>
  );
};

export default ListItem;
