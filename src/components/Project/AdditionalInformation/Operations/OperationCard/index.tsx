import { Stack } from '@mantine/core';

import { ProjectOperation } from '../../../../../store/apis/project/types';
import { Title } from '../../../styles';
import OperationButton from './OperationButton';

interface Props {
  projectOperations: ProjectOperation[];
  title: string;
}

const OperationCard = ({ projectOperations, title }: Props) => {
  return (
    <Stack spacing={20}>
      <Title>{title}</Title>
      <Stack spacing={16} align="center">
        {projectOperations.map((projectOperation) => (
          <OperationButton
            key={projectOperation.id}
            projectOperation={projectOperation}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default OperationCard;
