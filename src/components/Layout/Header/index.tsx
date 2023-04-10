// TODO:
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { Container } from '../../styles';
import User from '../../svgs/User';
import {
  Button,
  HorizontalDivider,
  Item,
  List,
  Navbar,
  UserProfileButton,
  Wrapper,
} from './styles';

interface NavbarItem {
  id: number;
  value: string;
  title: string;
  isShowLine: boolean;
}

const navbarList: NavbarItem[] = [
  {
    id: 1,
    value: Paths.EMPLOYEES,
    title: 'Сотрудники',
    isShowLine: true,
  },
  {
    id: 2,
    value: Paths.CONSTRUCTORS,
    title: 'Конструкторы',
    isShowLine: true,
  },
  {
    id: 3,
    value: Paths.REPORTS,
    title: 'Отчеты',
    isShowLine: true,
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
];

const Header = () => {
  const [list, setList] = useState<NavbarItem[]>(
    JSON.parse(localStorage.getItem('navbar-list') as string) || navbarList
  );

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

  useEffect(() => {
    localStorage.setItem('navbar-list', JSON.stringify(list));
  }, [list]);

  return (
    <Wrapper>
      <Container>
        <Navbar>
          <List>
            {list.map((item) => {
              return (
                <Item key={item.id}>
                  <Button
                    type="button"
                    onClick={() => handleNavigate(item.value, item.id - 1)}
                    active={location.pathname.includes(item.value)}
                    disabled={item.value === Paths.REPORTS}
                  >
                    {item.title}
                  </Button>
                  {item.isShowLine && <HorizontalDivider />}
                </Item>
              );
            })}
            <UserProfileButton type="button">
              <User />
            </UserProfileButton>
          </List>
        </Navbar>
      </Container>
    </Wrapper>
  );
};

export default Header;
