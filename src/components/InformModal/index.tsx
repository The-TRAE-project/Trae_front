import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Modal as MantineModal, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../constants/paths';
import { UnstyledButton, useModalStyles } from '../styles';
import { Title } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title: string;
  backPath?: string;
  onBack?: () => void;
}

const InformModal = ({
  isOpen,
  onClose,
  children,
  title,
  backPath,
  onBack,
}: Props) => {
  const navigate = useNavigate();
  const { classes } = useModalStyles();

  const navigateBack = () => {
    onClose();
    if (backPath) {
      navigate(backPath);
    }
    onBack?.();
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
      <Stack spacing={30}>
        <Title>{title}</Title>
        {children}
      </Stack>
    </MantineModal>
  );
};

export default InformModal;
