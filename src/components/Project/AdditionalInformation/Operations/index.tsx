import { ProjectOperation } from '../../../../store/apis/project/types';
import StageCard from '../../StageCard';
import OperationCard from './OperationCard';
import { Divider, Grid } from './styles';

interface Props {
  projectOperations: ProjectOperation[];
}

const Operations = ({ projectOperations }: Props) => {
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
    <StageCard title="ЭТАПЫ" lastFullWidth>
      <Grid>
        <OperationCard
          title="Выполненные"
          projectOperations={endedOperations}
        />
        <Divider $isLeft />
        <OperationCard title="В работе" projectOperations={inWorkOperations} />
        <Divider $isRight />
        <OperationCard
          title="Предстоит выполнить"
          projectOperations={notFinishedOperations}
        />
      </Grid>
    </StageCard>
  );
};

export default Operations;
