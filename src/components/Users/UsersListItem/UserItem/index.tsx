import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { UserShortInfo } from '../../../../store/apis/user/types';
import { LinkBtn, Wrapper } from './styles';

interface Props {
  user: UserShortInfo;
}

const UserItem = ({ user }: Props) => {
  const navigate = useNavigate();

  const navigateToEditing = () => {
    navigate(Paths.CONSTRUCTORS_EDITING, { state: { id: user.managerId } });
  };

  return (
    <Wrapper>
      <LinkBtn onClick={navigateToEditing} type="button">
        {user.firstName} {user.lastName}
      </LinkBtn>
    </Wrapper>
  );
};

export default UserItem;
