import { useNavigate } from 'react-router-dom';

import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, logoutUser } from '../../store/slices/auth';
import { clearEmployeeState } from '../../store/slices/employee';
import { clearWorkTypeState } from '../../store/slices/workType';
import { clearProjectState } from '../../store/slices/project';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { removeItem } from '../../helpers/removeItem';
import { useAccessCookies } from '../../helpers/hooks/useCookies';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import UserDetails from '../../components/Users/UserDetails';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';
import { Roles } from '../../store/slices/auth/types';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';

const PersonalCabinet = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { removeAccessCookie } = useAccessCookies();
  const { permission } = useAppSelector((store) => store.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    removeAccessCookie();
    dispatch(clearUserState());
    dispatch(clearEmployeeState());
    dispatch(clearWorkTypeState());
    dispatch(clearProjectState());
    removeItem(LocalStorage.NAVBAR_LIST);
    navigate(Paths.LOGIN, { replace: true });
  };

  const navigateToChangePassword = () => {
    if (permission === Roles.ADMIN) {
      navigate(Paths.PERSONAL_CABINET_CHANGE_PASSWORD);
    } else if (permission === Roles.CONSTRUCTOR) {
      navigate(Paths.CONSTRUCTOR_PERSONAL_CABINET_CHANGE_PASSWORD);
    }
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
          <ContentStack>
            <PageHeader
              isShowCreateBtn={false}
              isShowExitBtn
              onExit={handleLogout}
              isShowDashedBtn
              onDashedBtnClick={navigateToChangePassword}
            />

            <UserDetails />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinet;
