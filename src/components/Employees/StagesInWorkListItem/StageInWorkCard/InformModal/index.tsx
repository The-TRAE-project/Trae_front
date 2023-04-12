import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../../constants/paths';
import { useAppDispatch } from '../../../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../../../helpers/hooks/useAppSelector';
import { StageInWork } from '../../../../../store/apis/employee/types';
import { clearEmployeeState } from '../../../../../store/slices/employee';
import Modal from '../../../../Modal';
import Home from '../../../../svgs/Home';
import Timer from '../Timer';
import { HomeButton, Stack, InformTitle } from './styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  stage: StageInWork;
}

const InformModal = ({ isOpen, onClose, stage }: Props) => {
  const { employee } = useAppSelector((store) => store.employee);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    // TODO:
    onClose();
    navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
    dispatch(clearEmployeeState());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} withCloseButton={false}>
      <HomeButton onClick={handleClose}>
        <Home />
      </HomeButton>
      <Stack>
        <InformTitle>
          {employee?.firstName} {employee?.lastName} закончил <br />
          этап {stage.operationName.toLowerCase()}
        </InformTitle>
        <Timer isStart={isOpen} onStop={handleClose} timer={3} />
      </Stack>
    </Modal>
  );
};

export default InformModal;
