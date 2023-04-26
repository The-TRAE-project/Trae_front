import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Modal as MantineModal } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { UnstyledButton, useModalStyles } from '../../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  backPath: string;
}

const Modal = ({ isOpen, onClose, backPath, children }: Props) => {
  const navigate = useNavigate();
  const { classes } = useModalStyles();

  const navigateBack = () => {
    onClose();
    navigate(backPath);
  };

  const navigateToHome = () => {
    onClose();
    navigate(Paths.DASHBOARD);
  };

  return (
    <MantineModal
      centered
      opened={isOpen}
      onClose={onClose}
      size={1280}
      title={
        <Group spacing={46}>
          <UnstyledButton onClick={navigateBack} type="button">
            <BsArrowLeft size={50} color="var(--orange)" />
          </UnstyledButton>
          <UnstyledButton onClick={navigateToHome} type="button">
            <BsFillHouseFill size={44} color="var(--orange)" />
          </UnstyledButton>
        </Group>
      }
      withCloseButton={false}
      classNames={{
        content: classes.content,
        body: classes.body,
        header: classes.header,
        title: classes.title,
        close: classes.close,
      }}
    >
      {children}
    </MantineModal>
  );
};

export default Modal;
