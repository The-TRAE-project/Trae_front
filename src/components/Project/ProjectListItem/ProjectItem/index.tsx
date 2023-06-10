import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { useCloseProjectMutation } from '../../../../store/apis/project';
import { ProjectShortInfo } from '../../../../store/apis/project/types';
import { WorkTypeStatuses } from '../../../../store/apis/workTypes/types';
import ConfirmModal from '../../../ConfirmModal';
import { ProjectCustomer, ProjectName, ProjectNumber } from '../../../styles';
import { Wrapper, ProjectFinishBtn, ProjectOperationName } from './styles';

interface Props {
  project: ProjectShortInfo;
  isOpOverdue?: boolean;
  isPrOverdue?: boolean;
}

const ProjectItem = ({ project, isOpOverdue, isPrOverdue }: Props) => {
  const { id, number, name, customer, isEnded, operation } = project;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const [closeProject, { isSuccess, isLoading: isCloseLoading }] =
    useCloseProjectMutation();

  const stageInWork = operation.inWork ? 'stageInWork' : '';
  const stageReadyToAcceptance = operation ? 'stageReadyToAcceptance' : '';
  const stageIsEnded = operation.isEnded ? 'ended' : '';
  const projectEnded = isEnded ? 'ended' : '';

  const isShipmentEnded =
    operation.name === WorkTypeStatuses.SHIPMENT && !isEnded;

  const handleNavigateToDetails = () => navigate(`/project/${id}/details`);

  const handleCloseProject = async () => {
    try {
      await closeProject(id).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  const navigateToProjects = () => navigate(Paths.PROJECTS);

  const confirmTitle = `Завершить проект №${number}?`;
  const informTitle = `Проект №${number} завершен`;

  const title = isEnded ? 'Проект выполнен' : operation.name;

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
      <Wrapper onClick={handleNavigateToDetails} $isOpOverdue={isOpOverdue}>
        <ProjectNumber $isEnded={isEnded} $isOverdue={isPrOverdue}>
          {number}
        </ProjectNumber>
        <ProjectCustomer>{customer}</ProjectCustomer>
        <ProjectName>{name}</ProjectName>
        <ProjectOperationName
          onClick={(event) => event.stopPropagation()}
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
          ) : (
            title
          )}
        </ProjectOperationName>
      </Wrapper>
    </>
  );
};

export default ProjectItem;
