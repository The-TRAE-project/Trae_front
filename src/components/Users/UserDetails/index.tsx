import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

import { useGetUserDetailsQuery } from '../../../store/apis/user';
import {
  DetailsCard,
  DetailsText,
  DetailsTitle,
  EditDetailsButton,
  Wrapper,
} from './styles';
import { Paths } from '../../../constants/paths';
import { DashedOrangeButton } from '../../styles';

const UserDetails = () => {
  const navigate = useNavigate();
  const { data: user } = useGetUserDetailsQuery(1);

  const navigateToEditing = () => navigate(Paths.PERSONAL_CABINET_EDITING);
  const navigateToChangePassword = () =>
    navigate(Paths.PERSONAL_CABINET_CHANGE_PASSWORD);

  return (
    <Wrapper>
      {user && (
        <DetailsCard>
          <DetailsTitle>
            {user.lastName} {user.firstName} {user.middleName}
          </DetailsTitle>
          <DetailsText>{user.phone}</DetailsText>
          <EditDetailsButton onClick={navigateToEditing} type="button">
            <BsFillPencilFill size={24} />
          </EditDetailsButton>
        </DetailsCard>
      )}
      <DashedOrangeButton onClick={navigateToChangePassword} type="button">
        Поменять пароль
      </DashedOrangeButton>
    </Wrapper>
  );
};

export default UserDetails;
