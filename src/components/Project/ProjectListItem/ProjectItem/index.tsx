import { useNavigate } from 'react-router-dom';

import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { ButtonWrapper, ProjectOperationName } from './styles';

interface Props {
  project: ProjectShortInfo;
}

const ProjectItem = ({ project }: Props) => {
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
    <ButtonWrapper onClick={handleNavigateToDetails}>
      <ProjectNumber $isEnded={project.isEnded}>{project.number}</ProjectNumber>
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
