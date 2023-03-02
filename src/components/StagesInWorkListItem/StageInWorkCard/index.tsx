import { Group } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useFinishProjectStageMutation } from '../../../store/apis/employee';
import { StageInWork } from '../../../store/apis/employee/types';
import { logout } from '../../../store/slices/employee';
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
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);

  const [finishProject] = useFinishProjectStageMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const handleOpenConfirmModal = () => setIsConfirmModal(true);
  const handleCloseConfirmModal = () => setIsConfirmModal(false);

  const handleFinishProject = async () => {
    try {
      if (employee) {
        const response = await finishProject({
          employeeId: employee.id,
          operationId: stage.operationId,
        }).unwrap();

        console.log(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        <Group spacing={13}>
          <Group spacing={0}>
            <Customer>{stage.customerLastName}</Customer>
            <ProjectOperation>{stage.operationName}</ProjectOperation>
            <Furniture>{stage.projectName}</Furniture>
          </Group>
          <FinishButton onClick={handleOpenConfirmModal}>
            Завершить
          </FinishButton>
        </Group>
      </Wrapper>
      <ConfirmModal
        isOpen={isConfirmModal}
        onClose={handleCloseConfirmModal}
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
