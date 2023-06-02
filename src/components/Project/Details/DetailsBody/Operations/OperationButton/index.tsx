import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../../../helpers/hooks/useAppDispatch';
import { ProjectOperation } from '../../../../../../store/apis/project/types';
import { setProjectStage } from '../../../../../../store/slices/project';
import { Button } from './styles';

interface Props {
  projectId: number;
  projectOperation: ProjectOperation;
  isEnded: boolean;
}

const OperationButton = ({ projectId, projectOperation, isEnded }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inWorkClass = projectOperation.inWork && 'inWork';
  const isEndedClass = projectOperation.isEnded && 'isEnded';
  const readyToAcceptanceClass =
    projectOperation.readyToAcceptance && 'readyToAcceptance';

  const handleNavigateToDetails = () => {
    navigate(`/project/${projectId}/stage`);
    dispatch(setProjectStage(projectOperation));
  };

  return (
    <Button
      onClick={handleNavigateToDetails}
      className={inWorkClass || isEndedClass || readyToAcceptanceClass || ''}
      disabled={
        (!projectOperation.inWork &&
          !projectOperation.isEnded &&
          !projectOperation.readyToAcceptance) ||
        !isEnded
      }
      type="button"
    >
      {projectOperation.name}
    </Button>
  );
};

export default OperationButton;