import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { setProjectId } from '../../../../store/slices/project';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { ButtonWrapper, ProjectOperationName } from './styles';

interface Props {
  project: ProjectShortInfo;
}

const ProjectItem = ({ project }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inWork = project.operation.inWork ? 'inWork' : '';
  const isEnded = project.operation.isEnded ? 'isEnded' : '';
  const readyToAcceptance = project.operation ? 'readyToAcceptance' : '';

  const handleNavigateToDetails = () => {
    navigate(Paths.PROJECT_DETAILS);
    dispatch(setProjectId(project.id));
  };

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
