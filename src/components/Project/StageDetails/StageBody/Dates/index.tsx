import { Center, Stack } from '@mantine/core';

import { ProjectOperation } from '../../../../../store/apis/project/types';
import { convertHoursToDays } from '../../../../../helpers/convertHoursToDays';
import { formatDate } from '../../../helpers/formatDate';
import StageCard from '../../../StageCard';
import { DateBadge } from '../../../styles';
import { DateText, DateTitle, Grid } from './styles';

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
      <Grid>
        <Stack spacing={20}>
          <br />
          <Stack spacing={16}>
            <DateText>Начало</DateText>
            <DateText>Конец</DateText>
          </Stack>
        </Stack>
        <Stack spacing={20}>
          <DateTitle>План</DateTitle>
          <Stack spacing={16}>
            <DateText $isColorGreen={!startDate}>{formattedStartDate}</DateText>
            <DateText $isColorGreen={!plannedEndDate}>
              {formattedPlannedEndDate}
            </DateText>
          </Stack>
          <Center>
            {period ? (
              <DateBadge>{convertHoursToDays(period)} дней</DateBadge>
            ) : null}
          </Center>
        </Stack>
        <Stack spacing={20}>
          <DateTitle>Факт</DateTitle>
          <Stack spacing={16}>
            <DateText $isColorGreen={!acceptanceDate}>
              {formattedAcceptanceDate}
            </DateText>
            <DateText $isColorGreen={!realEndDate}>
              {formattedRealEndDate}
            </DateText>
          </Stack>
          <Center>
            {actualPeriod ? (
              <DateBadge>{convertHoursToDays(actualPeriod)} дней</DateBadge>
            ) : null}
          </Center>
        </Stack>
      </Grid>
    </StageCard>
  );
};

export default Dates;
