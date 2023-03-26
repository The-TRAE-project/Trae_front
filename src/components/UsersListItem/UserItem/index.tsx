import { UserShortInfo } from '../../../store/apis/user/types';
import { Wrapper } from './styles';

interface Props {
  user: UserShortInfo;
}

const UserItem = ({ user }: Props) => {
  return (
    <Wrapper>
      {user.firstName} {user.lastName}
    </Wrapper>
  );
};

export default UserItem;
