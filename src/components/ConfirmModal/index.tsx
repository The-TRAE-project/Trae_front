import { Group } from '@mantine/core';
import { useState } from 'react';

import Modal from '../Modal';
import InformModal from './InformModal';
import Timer from './Timer';
import { Button, ConfirmTitle, Stack, TitleStack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleAgreementClick?: () => void;
  questionTitle: string;
  informTitle: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  questionTitle,
  informTitle,
  handleAgreementClick,
}: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  const handleOpenInformModal = () => {
    setIsInform(true);
    onClose();
    handleAgreementClick?.();
  };

  const handleCloseInformModal = () => setIsInform(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Stack>
          <TitleStack>
            <ConfirmTitle>{questionTitle}</ConfirmTitle>
            <Group spacing={40} position="center">
              <Button onClick={handleOpenInformModal}>Да</Button>
              <Button onClick={onClose}>Нет</Button>
            </Group>
          </TitleStack>
          <Timer isStart={isOpen} onStop={onClose} timer={60 * 1.92} />
        </Stack>
      </Modal>
      <InformModal
        isOpen={isInform}
        onClose={handleCloseInformModal}
        informTitle={informTitle}
      />
    </>
  );
};

export default ConfirmModal;
