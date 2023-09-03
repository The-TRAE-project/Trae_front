import { Group } from '@mantine/core';
import { useState } from 'react';

import Modal from './Modal';
import InformModal from './InformModal';
import Timer from './Timer';
import { Button, ConfirmTitle, Stack, TitleStack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCallAtEnd?: () => void;
  onSubmit?: () => void;
  confirmTitle: string;
  informTitle: string;
  isHideHomeBtn: boolean;
  isWithTimer?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onCallAtEnd,
  onSubmit,
  confirmTitle,
  informTitle,
  isHideHomeBtn,
  isWithTimer = true,
}: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  const handleSubmit = () => {
    onClose();
    onSubmit?.();
    setIsInform(true);
  };

  const handleClose = () => {
    setIsInform(false);
    onCallAtEnd?.();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
        <Stack>
          <TitleStack>
            <ConfirmTitle dangerouslySetInnerHTML={{ __html: confirmTitle }} />
            <Group spacing={40} position="center">
              <Button onClick={handleSubmit}>Да</Button>
              <Button onClick={onClose}>Нет</Button>
            </Group>
          </TitleStack>
          {isWithTimer && (
            <Timer isStart={isOpen} onStop={onClose} timer={60 * 2} />
          )}
        </Stack>
      </Modal>
      <InformModal
        isOpen={isInform}
        onClose={handleClose}
        informTitle={informTitle}
        isHideHomeBtn={isHideHomeBtn}
        isWithTimer={isWithTimer}
      />
    </>
  );
};

export default ConfirmModal;
