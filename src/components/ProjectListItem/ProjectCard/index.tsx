import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants/paths';

import { Project } from '../data';
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

  const navigateToProjectStages = () => navigate(Paths.PROJECT_STAGES);

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
