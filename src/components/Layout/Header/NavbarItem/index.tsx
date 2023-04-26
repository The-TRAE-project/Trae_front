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

  return (
    <Wrapper>
      {navbarLink.value === Paths.PERSONAL_CABINET ? (
        <UserProfileButton
          type="button"
          onClick={() => handleNavigate(navbarLink.value)}
          active={location.pathname.includes(navbarLink.value)}
        >
          <BsPersonLinesFill size={48} />
        </UserProfileButton>
      ) : (
        <>
          <Button
            type="button"
            onClick={() => handleNavigate(navbarLink.value)}
            active={
              location.pathname.includes(navbarLink.value) ||
              navbarLink.value.startsWith(location.pathname)
            }
            disabled={navbarLink.value === Paths.REPORTS}
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
