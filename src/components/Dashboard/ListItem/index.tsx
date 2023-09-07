import Item from './Item';
import { Wrapper } from './styles';
import { useGetDashboardReportQuery } from '../../../store/apis/reports';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import Loader from '../../Loader';

export type DashboardListItem = {
  id: string;
  title: string;
  quantity: number | undefined;
};

const ListItem = () => {
  // 300000 ms = 5 min
  const extraOptions = { pollingInterval: 300000 };
  const queryArguments = null;

  const {
    data: dashboardReport,
    isLoading,
    isFetching,
    error,
    isError,
  } = useGetDashboardReportQuery(queryArguments, extraOptions);

  useDisplayError(error, isError);

  const list: DashboardListItem[] = [
    {
      id: '1',
      title: 'Проектов в системе',
      quantity: dashboardReport?.countNotEndedProjects,
    },
    {
      id: '2',
      title: 'Проектов готовых к отгрузке',
      quantity: dashboardReport?.countProjectsWithLastOpReadyToAcceptance,
    },
    {
      id: '3',
      title: 'Сотрудников на смене',
      quantity: dashboardReport?.countEmpsOnActiveWorkingShift,
    },
    {
      id: '4',
      title: 'Просроченных проектов по этапу',
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
      {isLoading || isFetching ? (
        <Loader size={80} isAbsoluteCentered />
      ) : (
        list.map((item) => <Item key={item.id} project={item} />)
      )}
    </Wrapper>
  );
};

export default ListItem;
