import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { Container } from '../../styles';
import User from '../../svgs/User';
import {
  Button,
  Item,
  List,
  Navbar,
  UserProfileButton,
  Wrapper,
} from './styles';

const list = [
  {
    value: Paths.PROJECTS,
    title: 'Проекты',
  },
  {
    value: Paths.CONSTRUCTORS,
    title: 'Конструкторы',
  },
  {
    value: Paths.EMPLOYEES,
    title: 'Сотрудники',
  },
  {
    value: Paths.REPORTS,
    title: 'Отчеты',
  },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Container>
        <Navbar>
          <List>
            {list.map((item, index) => (
              <Item
                key={item.value}
                active={item.value === location.pathname}
                hideBorder={!index}
              >
                <Button
                  type="button"
                  onClick={() => navigate(item.value)}
                  active={location.pathname.includes(item.value)}
                  disabled={
                    item.value === Paths.EMPLOYEES ||
                    item.value === Paths.REPORTS
                  }
                >
                  {item.title}
                </Button>
              </Item>
            ))}
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
