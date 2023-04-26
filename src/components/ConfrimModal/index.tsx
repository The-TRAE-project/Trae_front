import { useState } from 'react';
import { Group, Stack } from '@mantine/core';

import { Button, Title } from './styles';
import Modal from './Modal';
import InformModal from './InformModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  confirmTitle: string;
  informTitle: string;
  backPath: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onSubmit,
  confirmTitle,
  informTitle,
  backPath,
}: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  const handleSubmit = () => {
    onSubmit();
    onClose();
    setIsInform(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} backPath={backPath}>
        <Stack spacing={40} align="center">
          <Title dangerouslySetInnerHTML={{ __html: confirmTitle }} />
          <Group spacing={40}>
            <Button onClick={handleSubmit} type="button">
              Да
            </Button>
            <Button onClick={onClose} type="button">
              Нет
            </Button>
          </Group>
        </Stack>
      </Modal>
      <InformModal
        isOpen={isInform}
        onClose={() => setIsInform(false)}
        informTitle={informTitle}
        backPath={backPath}
      />
    </>
  );
};

export default ConfirmModal;
