import Home from '../../svgs/Home';
import Modal from '../../Modal';
import Timer from '../Timer';
import { HomeButton, InformTitle, Stack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
  isHideHomeBtn: boolean;
}

const InformModal = ({
  isOpen,
  onClose,
  informTitle,
  isHideHomeBtn,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
      {!isHideHomeBtn && (
        <HomeButton onClick={onClose}>
          <Home />
        </HomeButton>
      )}
      <Stack>
        <InformTitle dangerouslySetInnerHTML={{ __html: informTitle }} />
        <Timer isStart={isOpen} onStop={onClose} timer={3} />
      </Stack>
    </Modal>
  );
};

export default InformModal;
