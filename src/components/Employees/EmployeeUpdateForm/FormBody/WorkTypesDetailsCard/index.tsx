import { WorkType } from '../../../../../store/apis/workTypes/types';
import { Label, Stack } from '../styles';
import { Group, WorkTypeCard } from './styles';

interface Props {
  workTypes: WorkType[];
}

const WorkTypesDetailsCard = ({ workTypes }: Props) => {
  return (
    <Stack>
      <Label>Тип работ</Label>
      <Group>
        {workTypes.map((workType) => (
          <WorkTypeCard key={workType.id}>{workType.name}</WorkTypeCard>
        ))}
      </Group>
    </Stack>
  );
};

export default WorkTypesDetailsCard;
