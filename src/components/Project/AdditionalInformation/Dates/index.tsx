// TODO:
import { Center, Stack } from '@mantine/core';

import { Project } from '../../../../store/apis/project/types';
import { convertHoursToDays } from '../../../../helpers/convertHoursToDays';
import { formatDate } from '../../helpers/formatDate';
import InfoText from '../../InfoText';
import StageCard from '../../StageCard';
import { DateBadge, Divider, Group, Title } from '../../styles';

interface Props {
  project: Project;
}

const Dates = ({ project }: Props) => {
  const { startDate, plannedEndDate, period, realEndDate, actualPeriod } =
    project;

  return (
    <StageCard title="СРОКИ">
      <Group>
        <Stack spacing={20}>
          <Title>Планируемые</Title>
          <Stack spacing={16}>
            <InfoText
              label="Начало"
              text={startDate ? formatDate(startDate) : ''}
              isApart
            />
            <InfoText
              label="Конец"
              text={plannedEndDate ? formatDate(plannedEndDate) : ''}
              fw={700}
              isApart
              isWithBorder
            />
          </Stack>
          <Center>
            {period && <DateBadge>{convertHoursToDays(period)} дней</DateBadge>}
          </Center>
        </Stack>
        <Divider />
        <Stack spacing={20}>
          <Title>Фактические</Title>
          <Stack spacing={16}>
            <InfoText
              label="Начало"
              text={startDate ? formatDate(startDate) : ''}
              isApart
            />
            <InfoText
              label="Конец"
              text={realEndDate ? formatDate(realEndDate) : ''}
              isApart={!!realEndDate}
              isFlexStart={!realEndDate}
            />
          </Stack>
          <Center>
            {actualPeriod && (
              <DateBadge>{convertHoursToDays(actualPeriod)} дней</DateBadge>
            )}
          </Center>
        </Stack>
      </Group>
    </StageCard>
  );
};

export default Dates;
