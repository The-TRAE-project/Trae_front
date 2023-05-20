import { useState } from 'react';
import { Group } from '@mantine/core';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { useFinishProjectStageMutation } from '../../../../store/apis/project';
import {
  clearEmployeeState,
  setProjectNumber,
  setTimer,
} from '../../../../store/slices/employee';
import { StageInWork } from '../../../../store/apis/project/types';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { Paths } from '../../../../constants/paths';
import { UnstyledButton } from '../../../styles';
import ConfirmModal from '../../ConfirmModal';
import {
  Customer,
  FinishButton,
  Furniture,
  ProjectNumber,
  ProjectOperation,
  Wrapper,
} from './styles';

interface Props {
  stage: StageInWork;
}

const StageInWorkCard = ({ stage }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const [finishProject] = useFinishProjectStageMutation();

  const navigateToProjectStages = () => {
    navigate(`/employee/project/${stage.projectId}/stages`);
    dispatch(setProjectNumber(stage.projectNumber));
  };

  const handleOpen = () => {
    setIsOpen(true);
    dispatch(setTimer(121));
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(setTimer(121));
  };

  const handleSubmit = async () => {
    try {
      if (!employee) return;
      // TODO:
      setTimeout(async () => {
        await finishProject({
          employeeId: employee.id,
          operationId: stage.operationId,
        }).unwrap();
        dispatch(clearEmployeeState());
        navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
      }, 3000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error.data.status, error.data.error);
    }
  };

  const handleCallAtEnd = () => {
    dispatch(clearEmployeeState());
    navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
  };

  const confirmTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  } закончил этап ${stage.operationName.toLowerCase()}?`;

  const informTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  } закончил <br /> этап  ${stage.operationName.toLowerCase()}`;

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
            <UnstyledButton onClick={navigateToProjectStages}>
              <HiInformationCircle size={50} color="var(--orange)" />
            </UnstyledButton>
          </Group>
          <FinishButton onClick={handleOpen}>Завершить</FinishButton>
        </Group>
      </Wrapper>

      <ConfirmModal
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onCallAtEnd={handleCallAtEnd}
        isHideHomeBtn={false}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
      />
    </>
  );
};

export default StageInWorkCard;
