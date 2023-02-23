import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import Modal from '../../Modal';
import Home from '../../svgs/Home';
import Timer from '../Timer';
import { HomeButton, InformTitle, Stack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  candidate: string;
}

const InformModal = ({ isOpen, onClose, candidate }: Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(Paths.EMPLOYEE_MAIN);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
      <HomeButton onClick={() => navigate(Paths.EMPLOYEE_MAIN)}>
        <Home />
      </HomeButton>
      <Stack>
        <InformTitle>{candidate} начал этап сборка</InformTitle>
        <Timer isStart={isOpen} onStop={handleClose} />
      </Stack>
    </Modal>
  );
};

export default InformModal;
