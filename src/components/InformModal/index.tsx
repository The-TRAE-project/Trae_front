import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Modal as MantineModal, Stack } from '@mantine/core';

import { Paths } from '../../constants/paths';
import ArrowLeft from '../svgs/ArrowLeft';
import Home from '../svgs/Home';
import { UnstyledButton } from '../styles';
import { Title, useModalStyles } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title: string;
  backPath: string;
}

const InformModal = ({ isOpen, onClose, children, title, backPath }: Props) => {
  const navigate = useNavigate();
  const { classes } = useModalStyles();

  const navigateBack = () => {
    onClose();
    navigate(backPath);
  };

  const navigateToHome = () => {
    onClose();
    navigate(Paths.PROJECTS);
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
            <ArrowLeft />
          </UnstyledButton>
          <UnstyledButton onClick={navigateToHome} type="button">
            <Home />
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
