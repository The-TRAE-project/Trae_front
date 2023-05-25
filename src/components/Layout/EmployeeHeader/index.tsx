import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useCheckEmployeeWithTimer } from '../../../helpers/hooks/useCheckEmployeeWithTimer';
import { clearEmployeeState, setTimer } from '../../../store/slices/employee';
import { Container, UnstyledButton } from '../../styles';
import HeaderTime from './HeaderTime';
import HeaderTitle from './HeaderTitle';
import { FlexContainer, ProjectNumber, Wrapper } from './styles';

const EmployeeHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { projectNumber } = useAppSelector((store) => store.employee);

  // TODO:
  const navigateToBack = () => {
    switch (location.pathname) {
      case Paths.EMPLOYEE_PROJECTS:
        navigate(Paths.EMPLOYEE_MAIN);
        dispatch(setTimer(121));
        break;
      case Paths.EMPLOYEE_STAGES_IN_WORK:
        navigate(Paths.EMPLOYEE_MAIN);
        dispatch(setTimer(121));
        break;
      default:
        navigate(-2);
        dispatch(setTimer(121));
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

  useCheckEmployeeWithTimer();

  return (
    <Wrapper>
      <Container>
        {!findCurrentPath(Paths.LOGIN) && (
          <FlexContainer position="apart">
            <HeaderTime findCurrentPath={findCurrentPath} />
            {!findCurrentPath(Paths.EMPLOYEE_LOGIN) && (
              <>
                <Group spacing={172}>
                  {!findCurrentPath(Paths.EMPLOYEE_MAIN) && (
                    <HeaderTitle findCurrentPath={findCurrentPath} />
                  )}

                  {!findCurrentPath(
                    Paths.EMPLOYEE_MAIN,
                    Paths.EMPLOYEE_PROJECTS,
                    Paths.EMPLOYEE_STAGES_IN_WORK
                  ) &&
                    projectNumber && (
                      <ProjectNumber>{projectNumber}</ProjectNumber>
                    )}
                </Group>

                <Group spacing={40}>
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
