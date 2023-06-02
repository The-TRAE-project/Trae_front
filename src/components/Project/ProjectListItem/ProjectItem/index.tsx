/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { useCloseProjectMutation } from '../../../../store/apis/project';
import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { WorkTypeStatuses } from '../../../../store/apis/workTypes/types';
import ConfirmModal from '../../../ConfirmModal';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import {
  ButtonWrapper,
  ProjectFinishBtn,
  ProjectOperationName,
} from './styles';

interface Props {
  project: ProjectShortInfo;
  isOpOverdue?: boolean;
  isPrOverdue?: boolean;
}

const ProjectItem = ({ project, isOpOverdue, isPrOverdue }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const [closeProject, { isSuccess, isLoading: isCloseLoading }] =
    useCloseProjectMutation();

  const stageInWork = project.operation.inWork ? 'stageInWork' : '';
  const stageReadyToAcceptance = project.operation
    ? 'stageReadyToAcceptance'
    : '';
  const stageIsEnded = project.operation.isEnded ? 'ended' : '';
  const projectEnded = project.isEnded ? 'ended' : '';

  const isShipmentEnded =
    project.operation.name === WorkTypeStatuses.SHIPMENT &&
    project.operation.isEnded;

  const handleNavigateToDetails = () =>
    navigate(`/project/${project.id}/details`);

  const handleCloseProject = async () => {
    try {
      await closeProject(project.id).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  const navigateToProjects = () => navigate(Paths.PROJECTS);

  const confirmTitle = `Завершить проект №${project.number}?`;
  const informTitle = `Проект №${project.number} завершен`;

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCloseProject}
        onCallAtTheEnd={navigateToProjects}
        isSuccess={isSuccess}
        isLoading={isCloseLoading}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
        onBack={navigateToProjects}
      />
      <ButtonWrapper
        onClick={handleNavigateToDetails}
        $isOpOverdue={isOpOverdue}
      >
        <ProjectNumber $isEnded={project.isEnded} $isOverdue={isPrOverdue}>
          {project.number}
        </ProjectNumber>
        <ProjectCustomer>{project.customer}</ProjectCustomer>
        <ProjectName>{project.name}</ProjectName>
        <ProjectOperationName
          className={
            projectEnded ||
            stageInWork ||
            stageIsEnded ||
            stageReadyToAcceptance
          }
        >
          {isShipmentEnded ? (
            <ProjectFinishBtn onClick={() => setIsOpen(true)} type="button">
              Завершить проект
            </ProjectFinishBtn>
          ) : project.isEnded ? (
            'Проект выполнен'
          ) : (
            project.operation.name
          )}
        </ProjectOperationName>
      </ButtonWrapper>
    </>
  );
};

export default ProjectItem;
