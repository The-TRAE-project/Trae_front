import Modal from '../Modal';
import { Title } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
  onBack: () => void;
}

const InformModal = ({ isOpen, onClose, informTitle, onBack }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onBack={onBack}>
      <Title dangerouslySetInnerHTML={{ __html: informTitle }} />
    </Modal>
  );
};

export default InformModal;
