import { useState } from 'react';
import { Group } from '@mantine/core';
import { HiInformationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { StageInWork } from '../../../../store/apis/employee/types';
import { setProjectNumber } from '../../../../store/slices/employee';
import { UnstyledButton } from '../../../styles';
import ConfirmModal from './ConfirmModal';
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
  const [isOpen, setOpened] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToProjectStages = () => {
    navigate(`/employee/project/${stage.projectId}/stages`);
    dispatch(setProjectNumber(stage.projectNumber));
  };

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

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
          <FinishButton onClick={handleOpenModal}>Завершить</FinishButton>
        </Group>
      </Wrapper>
      <ConfirmModal isOpen={isOpen} onClose={handleCloseModal} stage={stage} />
    </>
  );
};

export default StageInWorkCard;
