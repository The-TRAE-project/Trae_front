import { useNavigate } from 'react-router-dom';

import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { ButtonWrapper, ProjectOperationName } from './styles';

interface Props {
  project: ProjectShortInfo;
  isOverdue?: boolean;
}

const ProjectItem = ({ project, isOverdue }: Props) => {
  const navigate = useNavigate();

  const stageInWork = project.operation.inWork ? 'stageInWork' : '';
  const stageReadyToAcceptance = project.operation
    ? 'stageReadyToAcceptance'
    : '';
  const stageIsEnded = project.operation.isEnded ? 'ended' : '';
  const projectEnded = project.isEnded ? 'ended' : '';

  const handleNavigateToDetails = () =>
    navigate(`/project/${project.id}/details`);

  return (
    <ButtonWrapper onClick={handleNavigateToDetails} $isOverdue={isOverdue}>
      <ProjectNumber $isEnded={project.isEnded} $isOverdue={isOverdue}>
        {project.number}
      </ProjectNumber>
      <ProjectCustomer>{project.customer}</ProjectCustomer>
      <ProjectName>{project.name}</ProjectName>
      <ProjectOperationName
        className={
          projectEnded || stageInWork || stageIsEnded || stageReadyToAcceptance
        }
      >
        {project.isEnded ? 'Проект выполнен' : project.operation.name}
      </ProjectOperationName>
    </ButtonWrapper>
  );
};

export default ProjectItem;
