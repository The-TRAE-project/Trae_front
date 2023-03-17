import { Group } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { StageInWork } from '../../../store/apis/employee/types';
import Vector from '../../svgs/Vector';
import ConfirmModal from './ConfirmModal';
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

  const navigate = useNavigate();

  const navigateToProjectStages = () =>
    navigate(`/employee/project/${stage.projectId}/stages`, {
      state: { projectNumber: stage.projectNumber },
    });

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
            <NavigateButton onClick={navigateToProjectStages}>
              <Vector />
            </NavigateButton>
          </Group>
          <FinishButton onClick={handleOpenModal}>Завершить</FinishButton>
        </Group>
      </Wrapper>
      <ConfirmModal isOpen={isOpen} onClose={handleCloseModal} stage={stage} />
    </>
  );
};

export default StageInWorkCard;
