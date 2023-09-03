import { useLocalStorage } from '@mantine/hooks';

import { useGetAllEmployeesQuery } from '../../../store/apis/employee';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { Status } from '../../../store/apis/user/types';
import { LocalStorage } from '../../../constants/localStorage';
import SliderButtons from '../../SliderButtons';
import Loader from '../../Loader';
import { ListItemWrapper, TwoColumnGrid } from '../../styles';
import EmployeeItem from './EmployeeItem';

interface Props {
  paramTypeWorkIds: number[] | null;
  paramActive: Status | null;
}

const EmployeesListItem = ({ paramTypeWorkIds, paramActive }: Props) => {
  const [page, setPage] = useLocalStorage<number>({
    key: LocalStorage.EMPLOYEE_PAGE,
    defaultValue: 0,
  });

  const {
    data: employees,
    error,
    isError,
    isLoading,
  } = useGetAllEmployeesQuery({
    elementPerPage: `&elementPerPage=${10}`,
    typeWorkId: paramTypeWorkIds?.length
      ? `&typeWorkId=${paramTypeWorkIds}`
      : '',
    isActive: paramActive ? `&isActive=${paramActive}` : '',
    page: `&page=${page}`,
  });

  useDisplayError(error, isError);

  const prevSlide = () => {
    if (page !== 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextSlide = () => {
    if (page + 1 !== employees?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ListItemWrapper>
      {!isLoading && !!employees ? (
        <>
          <TwoColumnGrid>
            {employees.content.map((employee) => (
              <EmployeeItem key={employee.id} employee={employee} />
            ))}
          </TwoColumnGrid>

          {employees.totalElements > 10 && (
            <SliderButtons
              current={employees.currentNumberPage + 1}
              quantity={employees.totalPages}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
              color="--white"
            />
          )}
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </ListItemWrapper>
  );
};

export default EmployeesListItem;
