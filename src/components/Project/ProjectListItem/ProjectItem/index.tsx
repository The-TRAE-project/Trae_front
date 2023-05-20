import { useNavigate } from 'react-router-dom';

import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { ButtonWrapper, ProjectOperationName } from './styles';

interface Props {
  project: ProjectShortInfo;
}

const ProjectItem = ({ project }: Props) => {
  const navigate = useNavigate();

  const inWork = project.operation.inWork ? 'inWork' : '';
  const isEnded = project.operation.isEnded ? 'isEnded' : '';
  const readyToAcceptance = project.operation ? 'readyToAcceptance' : '';

  const handleNavigateToDetails = () =>
    navigate(`/project/${project.id}/details`);

  return (
    <ButtonWrapper onClick={handleNavigateToDetails}>
      <ProjectNumber>{project.number}</ProjectNumber>
      <ProjectCustomer>{project.customer}</ProjectCustomer>
      <ProjectName>{project.name}</ProjectName>
      <ProjectOperationName className={inWork || isEnded || readyToAcceptance}>
        {project.operation.name}
      </ProjectOperationName>
    </ButtonWrapper>
  );
};

export default ProjectItem;
