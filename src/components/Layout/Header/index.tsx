import { useEffect } from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { useLocation } from 'react-router-dom';

import { LocalStorage } from '../../../constants/localStorage';
import { Paths } from '../../../constants/paths';
import { Container } from '../../styles';
import NavbarItem from './NavbarItem';
import { NavbarLink } from './types';
import { List, Navbar, Wrapper } from './styles';

const navbarList: NavbarLink[] = [
  {
    id: 1,
    value: Paths.EMPLOYEES,
    title: 'Сотрудники',
    isShowLine: true,
  },
  {
    id: 2,
    value: Paths.OFFICE,
    title: 'Офис',
    isShowLine: true,
  },
  {
    id: 3,
    value: Paths.REPORTS,
    title: 'Отчеты',
    isShowLine: false,
  },
  {
    id: 4,
    value: Paths.PROJECTS,
    title: 'Проекты',
    isShowLine: true,
  },
  {
    id: 5,
    value: Paths.WORK_TYPES,
    title: 'Типы работ',
    isShowLine: true,
  },
  {
    id: 6,
    value: Paths.PERSONAL_CABINET,
    title: '',
    isShowLine: true,
  },
];

const Header = () => {
  const [list, setList] = useLocalStorage<NavbarLink[]>({
    key: LocalStorage.NAVBAR_LIST,
    defaultValue: navbarList,
  });

  const location = useLocation();

  useEffect(() => {
    const previousItemIndex = list.findIndex((item) => {
      const slicedPath = location.pathname.split('/');
      return item.value.includes(slicedPath[1]);
    });

    setList(
      list.map((item) =>
        item.id === previousItemIndex
          ? { ...item, isShowLine: false }
          : { ...item, isShowLine: true }
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Wrapper>
      <Container>
        <Navbar>
          <List>
            {list.map((navbarLink) => (
              <NavbarItem key={navbarLink.id} navbarLink={navbarLink} />
            ))}
          </List>
        </Navbar>
      </Container>
    </Wrapper>
  );
};

export default Header;
