import { ProjectOperation } from '../../../../../store/apis/project/types';
import StageCard from '../../../StageCard';
import OperationCard from './OperationCard';
import { Divider, Grid } from './styles';

interface Props {
  projectOperations: ProjectOperation[];
  isEnded: boolean;
}

const Operations = ({ projectOperations, isEnded }: Props) => {
  const endedOperations = projectOperations.filter(
    (operation) => operation.isEnded
  );

  const inWorkOperations = projectOperations.filter(
    (operation) => operation.inWork
  );

  const notFinishedOperations = projectOperations.filter(
    (operation) => !operation.inWork && !operation.isEnded
  );

  return (
    <StageCard title="ЭТАПЫ" lastFullWidth isWithEditButton={isEnded}>
      <Grid>
        <OperationCard
          title="Выполненные"
          projectOperations={endedOperations}
          isEnded={isEnded}
        />
        <Divider $isLeft />
        <OperationCard
          title="В работе"
          projectOperations={inWorkOperations}
          isEnded={isEnded}
        />
        <Divider $isRight />
        <OperationCard
          title="Предстоит выполнить"
          projectOperations={notFinishedOperations}
          isEnded={isEnded}
        />
      </Grid>
    </StageCard>
  );
};

export default Operations;
