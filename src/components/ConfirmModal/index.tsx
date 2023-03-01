import { Group } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../store/slices/employee';
import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { Paths } from '../../constants/paths';
import Modal from '../Modal';
import InformModal from './InformModal';
import Timer from './Timer';
import { Button, ConfirmTitle, Stack, TitleStack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleAgreementClick?: () => void;
  redirectPath: string;
  questionTitle: string;
  informTitle: string;
  isHideHomeBtn?: boolean;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  questionTitle,
  informTitle,
  isHideHomeBtn,
  handleAgreementClick,
  redirectPath,
}: Props) => {
  const [isInform, setIsInform] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOpenInformModal = () => {
    setIsInform(true);
    onClose();
    handleAgreementClick?.();
  };

  const handleCloseInformModal = () => {
    setIsInform(false);
    navigate(redirectPath);
    if (redirectPath !== Paths.EMPLOYEE_LOGIN) {
      dispatch(logout());
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
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
        isHideHomeBtn={isHideHomeBtn}
      />
    </>
  );
};

export default ConfirmModal;
