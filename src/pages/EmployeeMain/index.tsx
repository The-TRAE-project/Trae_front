import { useState } from 'react';
import { Image, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import {
  clearEmployeeState,
  logoutEmployee,
  setTimer,
} from '../../store/slices/employee';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../helpers/showErrorNotification';
import traeLogo from '../../assets/traeLogo.svg';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import ConfirmModal from '../../components/Employees/ConfirmModal';
import Button from '../../components/Employees/Button';
import {
  ApartContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';
import { DashedButton } from './styles';

const EmployeeMain = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const navigateToProjects = () => {
    dispatch(setTimer(121));
    navigate(Paths.EMPLOYEE_PROJECTS);
  };

  const navigateToStagesInWork = () => {
    dispatch(setTimer(121));
    navigate(Paths.EMPLOYEE_STAGES_IN_WORK);
  };

  const handleOpen = () => {
    setIsOpen(true);
    dispatch(setTimer(121));
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(setTimer(121));
  };
  // TODO:
  const handleLogOut = async () => {
    try {
      if (!employee) return;

      await dispatch(logoutEmployee(employee.id)).unwrap();
      dispatch(clearEmployeeState());
      navigate(Paths.EMPLOYEE_LOGIN);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      handleClose();
      showErrorNotification(err.status, err.error);
    }
  };

  const confirmTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  } завершает <br /> рабочую смену?`;

  const informTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  }, <br /> ждем Вас снова в Trae <br /> До встречи 
  `;

  return (
    <>
      <SEO
        title="TRAE | Главная Сотрудника"
        description="Главная страница сотрудника."
        name="TRAE"
        type="application"
      />
      <WrapperWithBgImage>
        <ApartContainer>
          <TraeLogoImageWrapper>
            <Image src={traeLogo} alt="logo" />
          </TraeLogoImageWrapper>

          <Stack spacing={40}>
            <Button title="Проекты" onClick={navigateToProjects} width={410} />
            <Button
              title="Этапы в работе"
              onClick={navigateToStagesInWork}
              width={410}
            />
            <DashedButton onClick={handleOpen}>Завершить смену</DashedButton>
          </Stack>
        </ApartContainer>

        <ConfirmModal
          isOpen={isOpen}
          onClose={handleClose}
          onCallAtEnd={handleLogOut}
          isHideHomeBtn
          confirmTitle={confirmTitle}
          informTitle={informTitle}
        />
      </WrapperWithBgImage>
    </>
  );
};

export default EmployeeMain;
