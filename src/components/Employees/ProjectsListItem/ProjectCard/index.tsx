import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { Project } from '../../../../store/apis/employee/types';
import { setProjectNumber } from '../../../../store/slices/employee';
import {
  ProjectNumber,
  ProjectName,
  Wrapper,
  ProjectOperationName,
  Customer,
} from './styles';

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
    <Wrapper>
      <ProjectNumber>{project.number}</ProjectNumber>
      <Customer>{project.customer}</Customer>
      <ProjectName>{project.projectName}</ProjectName>
      <ProjectOperationName onClick={navigateToProjectStages}>
        {project.availableOperationName}
      </ProjectOperationName>
    </Wrapper>
  );
};

export default ProjectCard;
