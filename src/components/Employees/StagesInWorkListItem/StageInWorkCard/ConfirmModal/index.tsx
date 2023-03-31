import { useState } from 'react';
import { Group, Stack as MantineStack } from '@mantine/core';

import { useFinishProjectStageMutation } from '../../../../../store/apis/employee';
import { StageInWork } from '../../../../../store/apis/employee/types';
import { showErrorNotification } from '../../../../../helpers/showErrorNotification';
import { useAppSelector } from '../../../../../helpers/hooks/useAppSelector';
import Modal from '../../../../Modal';
import InformModal from '../InformModal';
import Timer from '../Timer';
import { ConfirmTitle, Button, Stack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stage: StageInWork;
}

const ConfirmModal = ({ isOpen, onClose, stage }: Props) => {
  const [isInformOpen, setIsInformOpen] = useState<boolean>(false);

  const [finishProject] = useFinishProjectStageMutation();

  const { employee } = useAppSelector((store) => store.employee);

  const handleFinishProject = async () => {
    try {
      if (!employee) return;
      // TODO:
      setTimeout(async () => {
        await finishProject({
          employeeId: employee.id,
          operationId: stage.operationId,
        }).unwrap();
      }, 3000);

      onClose();
      setIsInformOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onClose();
      showErrorNotification(error.data.status, error.data.error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
        <Stack>
          <MantineStack spacing={50}>
            <ConfirmTitle>
              {employee?.firstName} {employee?.lastName} закончил этап{' '}
              {stage.operationName.toLowerCase()}?
            </ConfirmTitle>
            <Group spacing={40} position="center">
              <Button onClick={handleFinishProject}>Да</Button>
              <Button onClick={onClose}>Нет</Button>
            </Group>
          </MantineStack>
          <Timer isStart={isOpen} onStop={onClose} timer={60 * 1.92} />
        </Stack>
      </Modal>

      <InformModal
        isOpen={isInformOpen}
        onClose={() => setIsInformOpen(false)}
        stage={stage}
      />
    </>
  );
};

export default ConfirmModal;
