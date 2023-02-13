import { useNavigate } from 'react-router-dom';

import { Project } from '../../../helpers/services/types';
import {
  ProjectNumber,
  ProjectName,
  Wrapper,
  ProjectStatus,
  Employee,
} from './styles';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();

  const navigateToProjectStages = () =>
    navigate(`/project/${project.id}/stages`);

  return (
    <Wrapper>
      <ProjectNumber>{project.projectNumber}</ProjectNumber>
      <Employee>{project.employee}</Employee>
      <ProjectName>{project.itemName}</ProjectName>
      <ProjectStatus
        onClick={navigateToProjectStages}
        disabled={project.isInWork}
      >
        {project.status}
      </ProjectStatus>
    </Wrapper>
  );
};

export default ProjectCard;
