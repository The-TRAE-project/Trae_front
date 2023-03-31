/* eslint-disable react/jsx-no-bind */
// TODO:
import { Group } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { logout } from '../../../store/slices/employee';
import { Container } from '../../styles';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import HeaderTime from './HeaderTime';
import HeaderTitle from './HeaderTitle';
import { Wrapper, Button } from './styles';

const EmployeeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        {!findCurrentPath(Paths.LOGIN) && (
          <Group position="apart">
            <HeaderTime findCurrentPath={findCurrentPath} />
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
        )}
      </Container>
    </Wrapper>
  );
};

export default EmployeeHeader;
