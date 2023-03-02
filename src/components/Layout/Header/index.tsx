import { Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { logout } from '../../../store/slices/employee';
import { useDate } from '../../../helpers/hooks/useDate';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { Paths } from '../../../constants/paths';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import { Container } from '../../styles';
import HeaderTitle from './HeaderTitle';
import { Button, DisplayGroup, DisplayTime, UserName, Wrapper } from './styles';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const { date } = useDate();

  const navigateToBack = () => navigate(-1);

  const navigateToLogin = () => {
    dispatch(logout());
    navigate(Paths.EMPLOYEE_LOGIN);
  };

  function findCurrentPath(...arg: string[]) {
    return arg.some((path) => path === location.pathname);
  }

  return (
    <Wrapper>
      <Container>
        <Group position="apart">
          <DisplayGroup>
            <DisplayTime
              isWhiteBlack={
                !findCurrentPath(
                  Paths.EMPLOYEE_PROJECTS,
                  Paths.EMPLOYEE_STAGES_IN_WORK
                )
              }
            >
              {date}
            </DisplayTime>
            {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
              <UserName
                isWhiteBlack={
                  !findCurrentPath(
                    Paths.EMPLOYEE_PROJECTS,
                    Paths.EMPLOYEE_STAGES_IN_WORK
                  )
                }
              >
                {employee && `${employee.firstName} ${employee.lastName}`}
              </UserName>
            )}
          </DisplayGroup>
          {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
            <>
              {!findCurrentPath(Paths.EMPLOYEE_MAIN) && (
                // eslint-disable-next-line react/jsx-no-bind
                <HeaderTitle findCurrentPath={findCurrentPath} />
              )}

              <Group spacing={11}>
                {!findCurrentPath(Paths.EMPLOYEE_MAIN) && (
                  <Button
                    onClick={navigateToBack}
                    type="button"
                    aria-label="back step button"
                  >
                    <ArrowLeft />
                  </Button>
                )}

                {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
                  <Button
                    onClick={navigateToLogin}
                    type="button"
                    aria-label="home button"
                  >
                    <Home />
                  </Button>
                )}
              </Group>
            </>
          )}
        </Group>
      </Container>
    </Wrapper>
  );
};

export default Header;
