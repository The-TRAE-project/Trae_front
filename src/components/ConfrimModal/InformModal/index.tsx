import Modal from '../Modal';
import { Title } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
  onBack: () => void;
}

const InformModal = ({ isOpen, onClose, informTitle, onBack }: Props) => {
  const handleClose = () => {
    onClose();
    onBack();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} onBack={onBack}>
      <Title dangerouslySetInnerHTML={{ __html: informTitle }} />
    </Modal>
  );
};

export default InformModal;
