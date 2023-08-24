import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { useAppDispatch } from '../../../../../../helpers/hooks/useAppDispatch';
import { ProjectOperation } from '../../../../../../store/apis/project/types';
import { setProjectStage } from '../../../../../../store/slices/project';
import { Button } from './styles';
import { LocalStorage } from '../../../../../../constants/localStorage';

interface Props {
  projectId: number;
  projectOperation: ProjectOperation;
  isEnded: boolean;
}

const OperationButton = ({ projectId, projectOperation, isEnded }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const inWorkClass = projectOperation.inWork && 'inWork';
  const isEndedClass = projectOperation.isEnded && 'isEnded';
  const readyToAcceptanceClass =
    projectOperation.readyToAcceptance && 'readyToAcceptance';

  const handleNavigateToDetails = () => {
    navigate(
      fromReports
        ? `/reports/by-projects/project/${projectId}/stage`
        : `/project/${projectId}/stage`
    );
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
