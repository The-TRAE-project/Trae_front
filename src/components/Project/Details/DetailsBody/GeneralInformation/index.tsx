import { useNavigate } from 'react-router-dom';
import { Stack } from '@mantine/core';

import { Project } from '../../../../../store/apis/project/types';
import { useAppDispatch } from '../../../../../helpers/hooks/useAppDispatch';
import InfoText from '../../../InfoText';
import StageCard from '../../../StageCard';
import { Paths } from '../../../../../constants/paths';
import { setProjectId } from '../../../../../store/slices/project';

interface Props {
  project: Project;
}

const GeneralInformation = ({ project }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const constructorFullName = `${project.managerDto.firstName} ${project.managerDto.lastName}`;

  const navigateToEditGeneralInfo = () => {
    navigate(Paths.PROJECT_EDIT_GENERAL_INFO);
    dispatch(setProjectId(project.id));
  };

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
