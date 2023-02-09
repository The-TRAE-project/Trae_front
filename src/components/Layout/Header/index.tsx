import { useEffect, useState } from 'react';
import { Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
  const [today, setDate] = useState(new Date()); // Save the current date to be able to trigger an update

  const navigateToBack = () => navigate(-1);
  const navigateToHome = () => navigate(Paths.MAIN);

  function findCurrentPath(...arg: string[]) {
    return arg.some((path) => path === location.pathname);
  }
  //   useEffect(() => {
  //     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
  //     // This will trigger a rerender every component that uses the useDate hook.
  //     setDate(new Date());
  //   }, 60 * 1000);
  //   return () => {
  //     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  //   }
  // }, []);

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
            {dayjs(Date.now()).format('HH:mm')}
          </DisplayTime>
          {findCurrentPath(Paths.MAIN) && (
            <Button type="button">
              <User />
            </Button>
          )}
          {!findCurrentPath(Paths.MAIN) && (
            <>
              {findCurrentPath(Paths.PROJECTS, Paths.PROJECT_STAGES) && (
                <HeaderTitle />
              )}

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
