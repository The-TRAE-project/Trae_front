import { useNavigate } from 'react-router-dom';
import { Stack } from '@mantine/core';

import { Project } from '../../../../../store/apis/project/types';
import InfoText from '../../../InfoText';
import StageCard from '../../../StageCard';

interface Props {
  project: Project;
}

const GeneralInformation = ({ project }: Props) => {
  const navigate = useNavigate();

  const constructorFullName = `${project.managerDto.firstName} ${project.managerDto.lastName}`;

  const navigateToEditGeneralInfo = () =>
    navigate(`/project/${project.id}/editing-general-info`);

  return (
    <StageCard
      title="ОБЩИЕ СВЕДЕНИЯ"
      isWithEditButton={!project.isEnded}
      onClick={navigateToEditGeneralInfo}
    >
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
