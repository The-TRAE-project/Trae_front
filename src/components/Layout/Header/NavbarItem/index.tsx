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
  list: NavbarLink[];
  setList: React.Dispatch<React.SetStateAction<NavbarLink[]>>;
}

const NavbarItem = ({ navbarLink, list, setList }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (itemPath: string, itemIndex: number) => {
    navigate(itemPath);
    setList(
      list.map((item) =>
        item.id === itemIndex
          ? { ...item, isShowLine: false }
          : { ...item, isShowLine: true }
      )
    );
  };

  return (
    <Wrapper>
      {navbarLink.value === Paths.PERSONAL_CABINET ? (
        <UserProfileButton
          type="button"
          onClick={() => handleNavigate(navbarLink.value, navbarLink.id - 1)}
          active={location.pathname.includes(navbarLink.value)}
        >
          <BsPersonLinesFill size={48} />
        </UserProfileButton>
      ) : (
        <>
          <Button
            type="button"
            onClick={() => handleNavigate(navbarLink.value, navbarLink.id - 1)}
            active={location.pathname.includes(navbarLink.value)}
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
