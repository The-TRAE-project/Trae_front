import { Group } from '@mantine/core';
import { useState } from 'react';

import Modal from '../../../Modal';
import InformModal from '../InformModal';
import Timer from '../Timer';
import { Button, ConfirmTitle, Stack, TitleStack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidate: string;
}

const ConfirmModal = ({ isOpen, onClose, candidate }: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  const handleOpenInformModal = () => {
    setIsInform(true);
    onClose();
  };

  const handleCloseInformModal = () => setIsInform(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Stack>
          <TitleStack>
            <ConfirmTitle>{candidate} начинает этап сборка?</ConfirmTitle>
            <Group spacing={40} position="center">
              <Button onClick={handleOpenInformModal}>Да</Button>
              <Button onClick={onClose}>Нет</Button>
            </Group>
          </TitleStack>
          <Timer isStart={isOpen} onStop={onClose} />
        </Stack>
      </Modal>
      <InformModal
        isOpen={isInform}
        onClose={handleCloseInformModal}
        candidate={candidate}
      />
    </>
  );
};

export default ConfirmModal;
