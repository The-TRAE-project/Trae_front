import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { clearEmployeeState } from '../../../store/slices/employee';
import { Container, UnstyledButton } from '../../styles';
import HeaderTime from './HeaderTime';
import HeaderTitle from './HeaderTitle';
import { FlexContainer, Wrapper } from './styles';

const EmployeeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // TODO:
  const navigateToBack = () => {
    switch (location.pathname) {
      case Paths.EMPLOYEE_PROJECTS:
        navigate(Paths.EMPLOYEE_MAIN);
        break;
      case Paths.EMPLOYEE_STAGES_IN_WORK:
        navigate(Paths.EMPLOYEE_MAIN);
        break;
      default:
        navigate(-2);
        break;
    }
  };

  const navigateToLogin = () => {
    dispatch(clearEmployeeState());
    navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
  };

  function findCurrentPath(...arg: string[]) {
    return arg.some((path) => path === location.pathname);
  }

  return (
    <Wrapper>
      <Container>
        {!findCurrentPath(Paths.LOGIN) && (
          <FlexContainer position="apart">
            <HeaderTime findCurrentPath={findCurrentPath} />
            {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
              <>
                {!findCurrentPath(Paths.EMPLOYEE_MAIN) && (
                  <HeaderTitle findCurrentPath={findCurrentPath} />
                )}

                <Group spacing={11}>
                  {!findCurrentPath(Paths.EMPLOYEE_MAIN) && (
                    <UnstyledButton
                      onClick={navigateToBack}
                      type="button"
                      aria-label="back step button"
                    >
                      <BsArrowLeft
                        size={50}
                        color="var(--orange)"
                        strokeWidth={1}
                      />
                    </UnstyledButton>
                  )}

                  {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
                    <UnstyledButton
                      onClick={navigateToLogin}
                      type="button"
                      aria-label="home button"
                    >
                      <BsFillHouseFill size={50} color="var(--orange)" />
                    </UnstyledButton>
                  )}
                </Group>
              </>
            )}
          </FlexContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default EmployeeHeader;
