import { useState, useEffect } from 'react';
import { Group, Stack } from '@mantine/core';

import Loader from '../Loader';
import Modal from './Modal';
import InformModal from './InformModal';
import { Button, Title } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onCallAtTheEnd?: () => void;
  isSuccess: boolean;
  isLoading: boolean;
  confirmTitle: string;
  informTitle: string;
  onBack: () => void;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onSubmit,
  onCallAtTheEnd,
  isSuccess,
  isLoading,
  confirmTitle,
  informTitle,
  onBack,
}: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      onClose();
      setIsInform(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleClose = () => {
    setIsInform(false);
    onCallAtTheEnd?.();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
        <Stack spacing={40} align="center">
          <Title dangerouslySetInnerHTML={{ __html: confirmTitle }} />
          <Group spacing={40}>
            <Button
              disabled={isLoading}
              onClick={onSubmit}
              $width={101}
              type="button"
            >
              {isLoading ? <Loader size={30} /> : 'Да'}
            </Button>
            <Button
              disabled={isLoading}
              onClick={onClose}
              $width={113}
              type="button"
            >
              Нет
            </Button>
          </Group>
        </Stack>
      </Modal>
      <InformModal
        isOpen={isInform}
        onClose={handleClose}
        informTitle={informTitle}
        onBack={onBack}
      />
    </>
  );
};

export default ConfirmModal;
