import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { ProjectOperation } from '../../../../../store/apis/project/types';
import StageCard from '../../../StageCard';
import OperationCard from './OperationCard';
import { Divider, Grid } from './styles';
import { LocalStorage } from '../../../../../constants/localStorage';

interface Props {
  projectId: number;
  projectOperations: ProjectOperation[];
  isEnded: boolean;
}

const Operations = ({ projectOperations, isEnded, projectId }: Props) => {
  const navigate = useNavigate();
  const [fromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const endedOperations = projectOperations.filter(
    (operation) => operation.isEnded
  );

  const inWorkOperations = projectOperations.filter(
    (operation) => operation.inWork
  );

  const notFinishedOperations = projectOperations.filter(
    (operation) => !operation.inWork && !operation.isEnded
  );

  const navigateToNewStage = () =>
    navigate(
      fromReports
        ? `/reports/by-projects/project/${projectId}/new-stage`
        : `/project/${projectId}/new-stage`
    );

  return (
    <StageCard
      title="ЭТАПЫ"
      lastFullWidth
      isWithEditButton={isEnded}
      onClick={navigateToNewStage}
    >
      <Grid>
        <OperationCard
          title="Выполненные"
          projectId={projectId}
          projectOperations={endedOperations}
          isEnded={isEnded}
        />
        <Divider $isLeft />
        <OperationCard
          title="В работе"
          projectId={projectId}
          projectOperations={inWorkOperations}
          isEnded={isEnded}
        />
        <Divider $isRight />
        <OperationCard
          title="Предстоит выполнить"
          projectId={projectId}
          projectOperations={notFinishedOperations}
          isEnded={isEnded}
        />
      </Grid>
    </StageCard>
  );
};

export default Operations;
