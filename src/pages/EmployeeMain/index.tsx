import { useState } from 'react';
import { Image, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { logout, logoutEmployee } from '../../store/slices/employee';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import traeLogo from '../../assets/traeLogo.svg';
import { Paths } from '../../constants/paths';
import Button from '../../components/Button';
import SEO from '../../components/SEO';
import ConfirmModal from '../../components/ConfirmModal';
import {
  ApartContainer,
  TraeLogoImageWrapper,
  WrapperWithBgImage,
} from '../../components/styles';
import { DashedButton } from './styles';

const EmployeeMain = () => {
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const navigateToProjects = () => navigate(Paths.EMPLOYEE_PROJECTS);
  const navigateToStagesInWork = () => navigate(Paths.EMPLOYEE_STAGES_IN_WORK);

  const handleOpenConfirmModal = () => setIsConfirmModal(true);
  const handleCloseConfirmModal = () => setIsConfirmModal(false);

  const handleCloseInformModal = () => {
    dispatch(logout());
    navigate(Paths.EMPLOYEE_LOGIN);
  };

  const handleAgreementClick = () => {
    if (!employee) return;

    dispatch(logoutEmployee(employee.id));
  };

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
            <DashedButton onClick={handleOpenConfirmModal}>
              Завершить смену
            </DashedButton>
          </Stack>
        </ApartContainer>

        <ConfirmModal
          isOpen={isConfirmModal}
          onClose={handleCloseConfirmModal}
          onCloseInformModal={handleCloseInformModal}
          handleAgreementClick={handleAgreementClick}
          isHideHomeBtn
          questionTitle={`${employee?.firstName} ${employee?.lastName} завершает <br /> рабочую смену?`}
          informTitle={`${employee?.firstName} ${employee?.lastName}, <br /> ждем Вас снова в Trae <br /> До встречи 
        `}
        />
      </WrapperWithBgImage>
    </>
  );
};

export default EmployeeMain;
