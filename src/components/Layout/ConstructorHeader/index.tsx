import { BsPersonLinesFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserProfileButton } from '../Header/NavbarItem/styles';
import { Paths } from '../../../constants/paths';

export function ConstructorHeader() {
  const navigate = useNavigate();

  return (
    <UserProfileButton
      type="button"
      onClick={() => navigate(Paths.CONSTRUCTOR_PERSONAL_CABINET)}
      $isActive={false}
    >
      <BsPersonLinesFill />
    </UserProfileButton>
  );
}
