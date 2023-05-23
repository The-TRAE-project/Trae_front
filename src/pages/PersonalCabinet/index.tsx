import { useNavigate } from 'react-router-dom';

import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import { clearUserState, logoutUser } from '../../store/slices/auth';
import { clearEmployeeState } from '../../store/slices/employee';
import { clearWorkTypeState } from '../../store/slices/workType';
import { clearProjectState } from '../../store/slices/project';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { removeItem } from '../../helpers/removeItem';
import SEO from '../../components/SEO';
import UserDetails from '../../components/Users/UserDetails';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';
import PageHeader from '../../components/PageHeader';

const PersonalCabinet = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearUserState());
    dispatch(clearEmployeeState());
    dispatch(clearWorkTypeState());
    dispatch(clearProjectState());
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
          <ContentStack>
            <PageHeader
              isShowCreateBtn={false}
              isShowExitBtn
              onExit={handleLogout}
            />

            <UserDetails />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinet;
