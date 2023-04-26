import { BsFillHouseFill } from 'react-icons/bs';

import Modal from '../Modal';
import Timer from '../Timer';
import { HomeButton, InformTitle, Stack } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
  isHideHomeBtn: boolean;
  isWithTimer: boolean;
}

const InformModal = ({
  isOpen,
  onClose,
  informTitle,
  isHideHomeBtn,
  isWithTimer,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} withCloseButton={false}>
      {!isHideHomeBtn && (
        <HomeButton onClick={onClose}>
          <BsFillHouseFill size={44} color="var(--orange)" />
        </HomeButton>
      )}
      <Stack>
        <InformTitle dangerouslySetInnerHTML={{ __html: informTitle }} />
        {isWithTimer && <Timer isStart={isOpen} onStop={onClose} timer={3} />}
      </Stack>
    </Modal>
  );
};

export default InformModal;
