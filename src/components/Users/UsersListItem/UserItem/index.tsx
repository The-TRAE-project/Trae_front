import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { UserShortInfo } from '../../../../store/apis/user/types';
import { BgWhiteCard, BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  user: UserShortInfo;
}

const UserItem = ({ user }: Props) => {
  const navigate = useNavigate();

  const navigateToEditingPage = () => {
    navigate(Paths.CONSTRUCTORS_EDITING, { state: { id: user.managerId } });
  };

  return (
    <BgWhiteCard>
      <BgWhiteCardLinkBtn onClick={navigateToEditingPage} type="button">
        {user.firstName} {user.lastName}
      </BgWhiteCardLinkBtn>
    </BgWhiteCard>
  );
};

export default UserItem;
