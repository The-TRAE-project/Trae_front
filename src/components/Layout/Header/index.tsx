import { Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDate } from '../../../helpers/hooks/useDate';
import { Paths } from '../../../constants/paths';
import { colors } from '../../../constants/colors';
import User from '../../svgs/User';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import { Container } from '../../styles';
import HeaderTitle from './HeaderTitle';
import { Button, DisplayTime, Wrapper } from './styles';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { date } = useDate();

  const navigateToBack = () => navigate(-1);
  const navigateToHome = () => navigate(Paths.MAIN);

  function findCurrentPath(...arg: string[]) {
    return arg.some((path) => path === location.pathname);
  }

  return (
    <Wrapper>
      <Container>
        <Group position="apart">
          <DisplayTime
            color={
              !findCurrentPath(Paths.PROJECTS)
                ? colors.whiteBlack
                : colors.white
            }
          >
            {date}
          </DisplayTime>
          {findCurrentPath(Paths.MAIN) && (
            <Button type="button">
              <User />
            </Button>
          )}
          {!findCurrentPath(Paths.MAIN) && (
            <>
              {!findCurrentPath(Paths.SELECTION) && <HeaderTitle />}

              <Group spacing={40}>
                {!findCurrentPath(Paths.SELECTION) && (
                  <Button
                    onClick={navigateToBack}
                    type="button"
                    aria-label="back step button"
                  >
                    <ArrowLeft />
                  </Button>
                )}

                <Button
                  onClick={navigateToHome}
                  type="button"
                  aria-label="home button"
                >
                  <Home />
                </Button>
              </Group>
            </>
          )}
        </Group>
      </Container>
    </Wrapper>
  );
};

export default Header;
