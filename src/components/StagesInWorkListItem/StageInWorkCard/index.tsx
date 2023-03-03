import { Group } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        // const response = await axios.post(
        //   'http://195.80.51.155:8088/api/operation/employee/finish-operation',
        //   {
        //     employeeId: employee.id,
        //     operationId: stage.operationId,
        //   },
        //   {
        //     headers: {
        //       Accept: 'application/json, text/plain, /',
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   }
        // );

        console.log(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const handleCloseInformModal = () => {
    // navigate(Paths.EMPLOYEE_LOGIN);
    // dispatch(logout());
  };
  console.log(
    import.meta.env.PROD
      ? import.meta.env.VITE_BACK_PROD_API_URL
      : import.meta.env.VITE_BACK_DEV_API_URL,
    import.meta.env.PROD
  );

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
