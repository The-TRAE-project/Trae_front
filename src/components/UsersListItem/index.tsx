import { useGetAllUsersQuery } from '../../store/apis/user';
import { useDisplayError } from '../../helpers/hooks/useDisplayError';
import { Roles } from '../../store/slices/auth/types';
import { Status } from '../../store/apis/user/types';
import ConstructorItem from './UserItem';
import { Grid, Wrapper } from './styles';
import ControlButtons from '../ControlButtons';

interface Props {
  paramRole: Roles | null;
  paramActive: Status | null;
}

const UsersListItem = ({ paramRole, paramActive }: Props) => {
  const {
    data: users,
    error,
    isError,
  } = useGetAllUsersQuery({
    elementPerPage: `elementPerPage=${10}`,
    role: paramRole ? `&role=${paramRole}` : '',
    status: paramActive ? `&status=${paramActive}` : '',
  });

  useDisplayError(error, isError);

  const prevSlide = () => {};
  const nextSlide = () => {};

  return (
    <Wrapper>
      <Grid>
        {users
          ? users.content.map((user) => (
              <ConstructorItem key={user.managerId} user={user} />
            ))
          : null}
      </Grid>

      <ControlButtons
        current={1}
        quantity={1}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        color="--white"
      />
    </Wrapper>
  );
};

export default UsersListItem;
