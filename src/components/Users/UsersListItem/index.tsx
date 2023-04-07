import { useState } from 'react';

import { useGetAllUsersQuery } from '../../../store/apis/user';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { Status } from '../../../store/apis/user/types';
import SliderButtons from '../../SliderButtons';
import Loader from '../../Loader';
import UserItem from './UserItem';
import { Grid, Wrapper } from './styles';

interface Props {
  paramRole: string | null;
  paramActive: Status | null;
}

const UsersListItem = ({ paramRole, paramActive }: Props) => {
  const [page, setPage] = useState<number>(0);

  const {
    data: users,
    error,
    isError,
    isLoading,
  } = useGetAllUsersQuery({
    elementPerPage: `&elementPerPage=${10}`,
    role: paramRole ? `&role=${paramRole}` : '',
    status: paramActive ? `&status=${paramActive}` : '',
    page: `&page=${page}`,
  });

  useDisplayError(error, isError);

  const prevSlide = () => {
    if (page !== 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const nextSlide = () => {
    if (page + 1 !== users?.totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Wrapper>
      {!isLoading && !!users ? (
        <>
          <Grid>
            {users.content.map((user) => (
              <UserItem key={user.managerId} user={user} />
            ))}
          </Grid>

          {users.totalElements > 10 && (
            <SliderButtons
              current={users.currentNumberPage + 1}
              quantity={users.totalPages}
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

export default UsersListItem;
