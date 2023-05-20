import { useNavigate } from 'react-router-dom';

import { UserShortInfo } from '../../../../store/apis/user/types';
import { BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  user: UserShortInfo;
}

const UserItem = ({ user }: Props) => {
  const navigate = useNavigate();

  const navigateToEditingPage = () =>
    navigate(`/constructor/${user.managerId}/editing`);

  return (
    <BgWhiteCardLinkBtn onClick={navigateToEditingPage} type="button">
      {user.firstName} {user.lastName}
    </BgWhiteCardLinkBtn>
  );
};

export default UserItem;
