import { Stack } from '@mantine/core';

import { Project } from '../../../../store/apis/project/types';
import StageCard from '../../StageCard';
import InfoText from '../../InfoText';

interface Props {
  project: Project;
}

const GeneralInformation = ({ project }: Props) => {
  const constructorFullName = `${project.managerDto.firstName} ${project.managerDto.lastName}`;
  return (
    <StageCard title="ОБЩИЕ СВЕДЕНИЯ">
      <Stack spacing={16}>
        <InfoText label="Клиент" text={project.customer} />
        <InfoText label="Наименование изделия" text={project.name} />
        <InfoText label="Конструктор" text={constructorFullName} />
        {project.comment ? (
          <InfoText label="Комментарий" text={project.comment} />
        ) : null}
      </Stack>
    </StageCard>
  );
};

export default GeneralInformation;
