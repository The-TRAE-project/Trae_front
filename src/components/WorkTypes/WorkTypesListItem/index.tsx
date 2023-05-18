import { useLocalStorage } from '@mantine/hooks';

import { Status } from '../../../store/apis/user/types';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useGetAllWorkTypesQuery } from '../../../store/apis/workTypes';
import { LocalStorage } from '../../../constants/localStorage';
import Loader from '../../Loader';
import SliderButtons from '../../SliderButtons';
import { TwoColumnGrid } from '../../styles';
import WorkTypeItem from './WorkTypeItem';
import { Wrapper } from './styles';

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
    <Wrapper>
      {!isLoading && !!workTypes ? (
        <>
          <TwoColumnGrid>
            {workTypes.content.map((workType) => (
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
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default WorkTypesListItem;
