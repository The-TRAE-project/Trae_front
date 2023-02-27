import { ReactNode } from 'react';
import { Modal as MantineModal } from '@mantine/core';

import { useDate } from '../../helpers/hooks/useDate';
import { useModalStyles } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  withCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  withCloseButton = true,
}: Props) => {
  const { classes } = useModalStyles();
  const { date } = useDate();

  return (
    <MantineModal
      centered
      opened={isOpen}
      onClose={onClose}
      size={1280}
      title={date}
      withCloseButton={withCloseButton}
      classNames={{
        modal: classes.modal,
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
