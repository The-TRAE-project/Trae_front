import { Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';

import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, logoutUser } from '../../store/slices/auth';
import { clearConstructorState } from '../../store/slices/constructor';
import { clearEmployeeState } from '../../store/slices/employee';
import { clearWorkTypeState } from '../../store/slices/workType';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { removeItem } from '../../helpers/removeItem';
import SEO from '../../components/SEO';
import UserDetails from '../../components/Users/UserDetails';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const PersonalCabinet = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToHome = () => navigate(Paths.DASHBOARD);
  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearUserState());
    dispatch(clearEmployeeState());
    dispatch(clearConstructorState());
    dispatch(clearWorkTypeState());
    removeItem(LocalStorage.NAVBAR_LIST);
    navigate(Paths.LOGIN, { replace: true });
  };

  return (
    <>
      <SEO
        title="TRAE | Личный кабинет"
        description="Личный кабинет пользователя."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={50}>
            <Group position="apart" spacing={100}>
              <UnstyledButton onClick={navigateToHome} type="button">
                <BsFillHouseFill size={44} color="var(--orange)" />
              </UnstyledButton>

              <OrangeButton onClick={handleLogout} type="button" $width={163}>
                <IoMdExit size={32} color="var(--white)" />
                <span>Выйти</span>
              </OrangeButton>
            </Group>

            <UserDetails />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinet;
