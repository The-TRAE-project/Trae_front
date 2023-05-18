import { Stack } from '@mantine/core';

import { ProjectOperation } from '../../../../store/apis/project/types';
import { TwoColumnGrid } from '../../../styles';
import DetailsCard from '../../DetailsCard';
import InfoText from '../../InfoText';
import StageCard from '../../StageCard';
import Dates from './Dates';

interface Props {
  projectStage: ProjectOperation;
}

const StageBody = ({ projectStage }: Props) => {
  const titleFinished = projectStage.isEnded && 'Выполнен';
  const titleInWork = projectStage.inWork && 'В работе';
  const takeByEmployeeOrWait = projectStage.employeeFirstLastNameDto
    ? `${projectStage.employeeFirstLastNameDto.firstName} ${projectStage.employeeFirstLastNameDto.lastName}`
    : 'в ожидании';

  return (
    <DetailsCard projectNumber={projectStage.projectNumber}>
      <TwoColumnGrid>
        <StageCard title="ЭТАП" isWithEditButton={false}>
          <Stack spacing={16}>
            <InfoText label="Этап" text={projectStage.name} />
            <InfoText label="Тип работ" text={projectStage.typeWorkName} />
            <InfoText
              label="Статус"
              text={titleFinished || titleInWork || 'Предстоит выполнить'}
            />
            <InfoText
              label="Сотрудник"
              text={takeByEmployeeOrWait}
              isColorGreen={!projectStage.employeeFirstLastNameDto}
            />
          </Stack>
        </StageCard>
        <Dates projectOperation={projectStage} />
      </TwoColumnGrid>
    </DetailsCard>
  );
};

export default StageBody;
