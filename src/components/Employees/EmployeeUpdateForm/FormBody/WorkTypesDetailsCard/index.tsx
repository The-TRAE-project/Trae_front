import { WorkType } from '../../../../../store/apis/workTypes/types';
import { Label, Stack } from '../../../../DetailsCard/styles';
import { Group, GroupWrapper, WorkTypeCard, WorkTypeWrapper } from './styles';

interface Props {
  workTypes: WorkType[];
}

const WorkTypesDetailsCard = ({ workTypes }: Props) => {
  return (
    <Stack>
      <Label>Тип работ</Label>
      <WorkTypeWrapper>
        <GroupWrapper>
          <Group>
            {workTypes.map((workType) => (
              <WorkTypeCard key={workType.id}>{workType.name}</WorkTypeCard>
            ))}
          </Group>
        </GroupWrapper>
      </WorkTypeWrapper>
    </Stack>
  );
};

export default WorkTypesDetailsCard;
