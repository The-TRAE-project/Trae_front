import { Stack } from '@mantine/core';

import { ProjectOperation } from '../../../../../../store/apis/project/types';
import { Title } from '../../../../styles';
import OperationButton from '../OperationButton';

interface Props {
  projectId: number;
  projectOperations: ProjectOperation[];
  title: string;
  isEnded: boolean;
}

const OperationCard = ({
  projectOperations,
  title,
  isEnded,
  projectId,
}: Props) => {
  return (
    <Stack spacing={20}>
      <Title>{title}</Title>
      <Stack spacing={16} align="center">
        {projectOperations.map((projectOperation) => (
          <OperationButton
            key={projectOperation.id}
            projectId={projectId}
            projectOperation={projectOperation}
            isEnded={isEnded}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default OperationCard;
