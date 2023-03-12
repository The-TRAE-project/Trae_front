import { Group } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useFinishProjectStageMutation } from '../../../store/apis/employee';
import { StageInWork } from '../../../store/apis/employee/types';
import { logout } from '../../../store/slices/employee';
import ConfirmModal from '../../ConfirmModal';
import Vector from '../../svgs/Vector';
import {
  Customer,
  FinishButton,
  Furniture,
  NavigateButton,
  ProjectNumber,
  ProjectOperation,
  Wrapper,
} from './styles';

interface Props {
  stage: StageInWork;
}

const StageInWorkCard = ({ stage }: Props) => {
  const [isOpen, setOpened] = useState<boolean>(false);

  const [finishProject] = useFinishProjectStageMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const navigateToProjectStages = () =>
    navigate(`/employee/project/${stage.projectId}/stages`, {
      state: { projectNumber: stage.projectNumber },
    });

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  const handleFinishProject = async () => {
    try {
      if (!employee) return;

      await finishProject({
        employeeId: employee.id,
        operationId: stage.operationId,
      }).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleCloseModal();
      showErrorNotification(error.data.status, error.data.error);
    }
  };

  const handleCloseInformModal = () => {
    navigate(Paths.EMPLOYEE_LOGIN);
    dispatch(logout());
  };

  return (
    <>
      <Wrapper>
        <ProjectNumber>{stage.projectNumber}</ProjectNumber>
        <Group spacing={75} position="apart">
          <Group spacing={52}>
            <Group spacing={0}>
              <Customer>{stage.customerLastName}</Customer>
              <ProjectOperation>{stage.operationName}</ProjectOperation>
              <Furniture>{stage.projectName}</Furniture>
            </Group>
            <NavigateButton onClick={navigateToProjectStages}>
              <Vector />
            </NavigateButton>
          </Group>
          <FinishButton onClick={handleOpenModal}>Завершить</FinishButton>
        </Group>
      </Wrapper>
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onCloseInformModal={handleCloseInformModal}
        isHideHomeBtn={false}
        handleAgreementClick={handleFinishProject}
        questionTitle={`${employee?.firstName} ${
          employee?.lastName
        } закончил этап <br /> ${stage.operationName.toLowerCase()}?`}
        informTitle={`${employee?.firstName} ${
          employee?.lastName
        } закончил <br /> этап ${stage.operationName.toLowerCase()}`}
      />
    </>
  );
};

export default StageInWorkCard;
