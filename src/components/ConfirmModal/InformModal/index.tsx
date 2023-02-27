import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import Home from '../../svgs/Home';
import Modal from '../../Modal';
import Timer from '../Timer';
import { HomeButton, InformTitle, Stack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
}

const InformModal = ({ isOpen, onClose, informTitle }: Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(Paths.EMPLOYEE_MAIN);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} withCloseButton={false}>
      <HomeButton onClick={handleClose}>
        <Home />
      </HomeButton>
      <Stack>
        <InformTitle>{informTitle}</InformTitle>
        <Timer isStart={isOpen} onStop={handleClose} timer={10} />
      </Stack>
    </Modal>
  );
};

export default InformModal;
