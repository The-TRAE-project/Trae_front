import { Group } from '@mantine/core';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
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
            <Button onClick={navigateToBack} type="button" isOrange>
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          )}
          <Button>
            <FontAwesomeIcon icon={faUser} />
          </Button>
        </Group>
      </Container>
    </Wrapper>
  );
};

export default Header;
