import { useNavigate } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';

import { useGetUserAdditionalInformationQuery } from '../../../store/apis/user';
import { Paths } from '../../../constants/paths';
import { DashedOrangeButton } from '../../styles';
import Loader from '../../Loader';
import {
  DetailsCard,
  DetailsText,
  DetailsTitle,
  EditDetailsButton,
  Wrapper,
} from './styles';

const UserDetails = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserAdditionalInformationQuery();

  const navigateToEditing = () => navigate(Paths.PERSONAL_CABINET_EDITING);
  const navigateToChangePassword = () =>
    navigate(Paths.PERSONAL_CABINET_CHANGE_PASSWORD);

  return (
    <Wrapper>
      {!isLoading && user ? (
        <>
          <DetailsCard>
            <DetailsTitle>
              {user.lastName} {user.firstName} {user.middleName}
            </DetailsTitle>
            <DetailsText>{user.phone}</DetailsText>
            <EditDetailsButton onClick={navigateToEditing} type="button">
              <BsFillPencilFill size={24} />
            </EditDetailsButton>
          </DetailsCard>
          <DashedOrangeButton onClick={navigateToChangePassword} type="button">
            Поменять пароль
          </DashedOrangeButton>
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default UserDetails;
