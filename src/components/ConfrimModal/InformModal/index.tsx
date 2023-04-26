import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import { Title } from '../styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  informTitle: string;
  backPath: string;
}

const InformModal = ({ isOpen, onClose, informTitle, backPath }: Props) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate(backPath);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} backPath={backPath}>
      <Title dangerouslySetInnerHTML={{ __html: informTitle }} />
    </Modal>
  );
};

export default InformModal;
