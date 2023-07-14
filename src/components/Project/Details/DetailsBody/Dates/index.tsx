import { Center, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { convertHoursToDays } from '../../../../../helpers/convertHoursToDays';
import { Project } from '../../../../../store/apis/project/types';
import { formatDate } from '../../../helpers/formatDate';
import StageCard from '../../../StageCard';
import { DateBadge } from '../../../styles';
import { DateTitle, DateText, Grid } from './styles';

interface Props {
  project: Project;
}

const Dates = ({ project }: Props) => {
  const navigate = useNavigate();

  const {
    id,
    startDate,
    plannedEndDate,
    period,
    realEndDate,
    actualPeriod,
    startFirstOperationDate,
    endDateInContract,
  } = project;

  const navigateToEditEndDate = () =>
    navigate(`/project/${id}/editing-end-date`);

  return (
    <StageCard
      title="ДАТЫ"
      isWithEditButton={!project.isEnded}
      onClick={navigateToEditEndDate}
    >
      <Grid>
        <Stack spacing={20} align="center">
          <br />
          <Stack spacing={16}>
            <DateTitle>Начало</DateTitle>
            <DateTitle>Конец</DateTitle>
          </Stack>
        </Stack>

        <Stack spacing={20}>
          <DateText>План</DateText>
          <Stack spacing={16} justify="space-between">
            {startDate ? <DateText> {formatDate(startDate)}</DateText> : <br />}
            {plannedEndDate ? (
              <DateText>{formatDate(plannedEndDate)}</DateText>
            ) : (
              <br />
            )}
          </Stack>
          <Center>
            {period && <DateBadge>{convertHoursToDays(period)}</DateBadge>}
          </Center>
        </Stack>
        <Stack spacing={20}>
          <DateText>Факт</DateText>
          <Stack spacing={16} justify="space-between">
            {startDate ? <DateText>{formatDate(startDate)}</DateText> : <br />}
            {realEndDate ? (
              <DateText>{formatDate(realEndDate)}</DateText>
            ) : (
              <br />
            )}
          </Stack>
          <Center>
            {actualPeriod && (
              <DateBadge>{convertHoursToDays(actualPeriod)}</DateBadge>
            )}
          </Center>
        </Stack>

        <Stack spacing={20}>
          <DateText>Договор</DateText>
          <Stack spacing={16} justify="space-between">
            <br />
            {endDateInContract ? (
              <DateText $isWithBorder>{formatDate(endDateInContract)}</DateText>
            ) : (
              <br />
            )}
          </Stack>
        </Stack>
      </Grid>
    </StageCard>
  );
};

export default Dates;
