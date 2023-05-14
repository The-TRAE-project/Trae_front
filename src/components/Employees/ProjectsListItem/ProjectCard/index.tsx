import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { Project } from '../../../../store/apis/employee/types';
import { setProjectNumber } from '../../../../store/slices/employee';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { Wrapper, ProjectOperationName } from './styles';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToProjectStages = () => {
    navigate(`/employee/project/${project.id}/stages`);
    dispatch(setProjectNumber(project.number));
  };

  return (
    <Wrapper onClick={navigateToProjectStages}>
      <ProjectNumber>{project.number}</ProjectNumber>
      <ProjectCustomer>{project.customer}</ProjectCustomer>
      <ProjectName>{project.projectName}</ProjectName>
      <ProjectOperationName>
        {project.availableOperationName}
      </ProjectOperationName>
    </Wrapper>
  );
};

export default ProjectCard;
