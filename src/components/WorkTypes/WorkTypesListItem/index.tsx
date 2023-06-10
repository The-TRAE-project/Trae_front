import { useLocalStorage } from '@mantine/hooks';

import { LocalStorage } from '../../../constants/localStorage';
import { Status } from '../../../store/apis/user/types';
import { useGetAllWorkTypesQuery } from '../../../store/apis/workTypes';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { sortWorkTypesByPriority } from '../../../helpers/sortWorkTypesByPriority';
import Loader from '../../Loader';
import SliderButtons from '../../SliderButtons';
import { ListItemWrapper, TwoColumnGrid } from '../../styles';
import WorkTypeItem from './WorkTypeItem';

interface Props {
  paramActive: Status | null;
}

const WorkTypesListItem = ({ paramActive }: Props) => {
  const [page, setPage] = useLocalStorage<number>({
    key: LocalStorage.WORK_TYPE_PAGE,
    defaultValue: 0,
  });

  const {
    data: workTypes,
    error,
    isError,
    isLoading,
  } = useGetAllWorkTypesQuery({
    elementPerPage: `&elementPerPage=${10}`,
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
    if (page + 1 !== workTypes?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <ListItemWrapper>
      {!isLoading ? (
        !!workTypes &&
        workTypes.content.length > 0 && (
          <>
            <TwoColumnGrid>
              {sortWorkTypesByPriority(workTypes.content).map((workType) => (
                <WorkTypeItem key={workType.id} workType={workType} />
              ))}
            </TwoColumnGrid>

            {workTypes.totalElements > 10 && (
              <SliderButtons
                current={workTypes.currentNumberPage + 1}
                quantity={workTypes.totalPages}
                prevSlide={prevSlide}
                nextSlide={nextSlide}
                color="--white"
              />
            )}
          </>
        )
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </ListItemWrapper>
  );
};

export default WorkTypesListItem;
