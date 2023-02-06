import { Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import User from '../../svgs/User';
import ArrowLeft from '../../svgs/ArrowLeft';
import { Container } from '../../styles';
import { Button, Wrapper } from './styles';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToBack = () => navigate(-1);

  const isMainPage = location.pathname !== Paths.MAIN;

  return (
    <Wrapper>
      <Container>
        <Group position={isMainPage ? 'apart' : 'right'}>
          {isMainPage && (
            <Button onClick={navigateToBack} type="button">
              <ArrowLeft />
            </Button>
          )}
          <Button>
            <User />
          </Button>
        </Group>
      </Container>
    </Wrapper>
  );
};

export default Header;
