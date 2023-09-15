import { Stack } from '@mantine/core';
import dayjs from 'dayjs';
import {
  Operation,
  OperationNumber,
  OperationsWrapper,
  ProjectNumber,
  Wrapper,
  ProjectInformation,
  Title,
} from './styles';
import { CreateProjectFormValues } from '../../../../store/apis/project/types';
import { TwoColumnGrid } from '../../../styles';

export const ProjectSummary = ({
  number,
  customer,
  name,
  comment,
  operations,
  plannedEndDate,
}: CreateProjectFormValues) => {
  return (
    <Wrapper>
      <ProjectNumber>{number}</ProjectNumber>
      <ProjectInformation>
        <TwoColumnGrid>
          <Stack>
            <p>
              <Title>Клиент </Title>
              {customer}
            </p>
            <p>
              <Title>Наименование изделия </Title>
              {name}
            </p>
            <p>
              <Title>Дата окончания </Title>
              {dayjs(plannedEndDate).format('DD.MM.YYYY')}
            </p>
            <p>
              <Title>Комментарий </Title>
              {comment}
            </p>
          </Stack>
          <OperationsWrapper>
            {operations.map((item, index) => {
              return (
                <Operation key={item.typeWorkId}>
                  <OperationNumber>{index + 1}</OperationNumber>
                  {item.name}
                </Operation>
              );
            })}
          </OperationsWrapper>
        </TwoColumnGrid>
      </ProjectInformation>
    </Wrapper>
  );
};
