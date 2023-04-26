// TODO:
import { Center, Stack } from '@mantine/core';

import { ProjectOperation } from '../../../../../store/apis/project/types';
import { formatDate } from '../../../helpers/formatDate';
import InfoText from '../../../InfoText';
import StageCard from '../../../StageCard';
import { DateBadge, Divider, Group, Title } from '../../../styles';

interface Props {
  projectOperation: ProjectOperation;
}

const Dates = ({ projectOperation }: Props) => {
  const {
    startDate,
    acceptanceDate,
    plannedEndDate,
    period,
    realEndDate,
    actualPeriod,
    inWork,
  } = projectOperation;

  const formattedStartDate = startDate ? formatDate(startDate) : 'в ожидании';
  const formattedPlannedEndDate = plannedEndDate
    ? formatDate(plannedEndDate)
    : 'в ожидании';
  const formattedAcceptanceDate = acceptanceDate
    ? formatDate(acceptanceDate)
    : 'в ожидании';
  // eslint-disable-next-line no-nested-ternary
  const formattedRealEndDate = realEndDate
    ? formatDate(realEndDate)
    : inWork
    ? 'в работе'
    : 'в ожидании';

  return (
    <StageCard title="СРОКИ" isWithEditButton={false}>
      <Group>
        <Stack spacing={20}>
          <Title>Планируемые</Title>
          <Stack spacing={16}>
            <InfoText
              label="Начало"
              text={formattedStartDate}
              isApart
              isColorGreen={!startDate}
            />
            <InfoText
              label="Конец"
              text={formattedPlannedEndDate}
              isApart
              isColorGreen={!plannedEndDate}
            />
          </Stack>
          <Center>{period ? <DateBadge>{period} дня</DateBadge> : null}</Center>
        </Stack>
        <Divider />
        <Stack spacing={20}>
          <Title>Фактические</Title>
          <Stack spacing={16}>
            <InfoText
              label="Начало"
              text={formattedAcceptanceDate}
              isApart
              isColorGreen={!acceptanceDate}
            />
            <InfoText
              label="Конец"
              text={formattedRealEndDate}
              isApart
              isColorGreen={!realEndDate}
            />
          </Stack>
          <Center>
            {actualPeriod ? <DateBadge>{actualPeriod} дней</DateBadge> : null}
          </Center>
        </Stack>
      </Group>
    </StageCard>
  );
};

export default Dates;
