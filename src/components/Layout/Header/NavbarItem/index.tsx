import { useLocation, useNavigate } from 'react-router-dom';
import { BsPersonLinesFill } from 'react-icons/bs';

import { Paths } from '../../../../constants/paths';
import { NavbarLink } from '../types';
import {
  Button,
  HorizontalDivider,
  UserProfileButton,
  Wrapper,
} from './styles';

interface Props {
  navbarLink: NavbarLink;
}

const NavbarItem = ({ navbarLink }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (itemPath: string) => navigate(itemPath);

  const definePathIsActive = (link: string, path: string) => {
    const slicedPath = path.split('/');
    return link.includes(slicedPath[1]);
  };

  return (
    <Wrapper>
      {navbarLink.value === Paths.PERSONAL_CABINET ? (
        <UserProfileButton
          type="button"
          onClick={() => handleNavigate(navbarLink.value)}
          $isActive={definePathIsActive(navbarLink.value, location.pathname)}
        >
          <BsPersonLinesFill />
        </UserProfileButton>
      ) : (
        <>
          <Button
            type="button"
            onClick={() => handleNavigate(navbarLink.value)}
            $isActive={definePathIsActive(navbarLink.value, location.pathname)}
          >
            {navbarLink.title}
          </Button>
          {navbarLink.isShowLine && <HorizontalDivider />}
        </>
      )}
    </Wrapper>
  );
};

export default NavbarItem;
