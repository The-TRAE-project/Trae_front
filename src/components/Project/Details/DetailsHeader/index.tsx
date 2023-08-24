import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLocalStorage } from '@mantine/hooks';
import { useCloseProjectMutation } from '../../../../store/apis/project';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { Paths } from '../../../../constants/paths';
import ConfirmModal from '../../../ConfirmModal';
import FormHeader from '../../../FormHeader';
import { LocalStorage } from '../../../../constants/localStorage';

interface Props {
  projectId: number;
  projectNumber: number;
  isEnded: boolean;
}

const DetailsHeader = ({ projectId, projectNumber, isEnded }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [fromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const navigate = useNavigate();

  const [closeProject, { isSuccess, isLoading: isCloseLoading }] =
    useCloseProjectMutation();

  const handleCloseProject = async () => {
    try {
      await closeProject(projectId).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  const confirmTitle = `Завершить проект №${projectNumber}?`;
  const informTitle = `Проект №${projectNumber} завершен`;

  const navigateToProjects = () =>
    navigate(fromReports ? Paths.REPORTS_BY_PROJECTS : Paths.PROJECTS);
  const navigateToDeletePage = () =>
    navigate(
      fromReports
        ? `/reports/by-projects/project/${projectId}/delete`
        : `/project/${projectId}/delete`
    );

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

      <FormHeader
        onBack={navigateToProjects}
        isShowSubmitBtn={false}
        isShowClickBtn={!isEnded}
        isShowDeleteBtn
        onClick={() => setIsOpen(true)}
        onDelete={navigateToDeletePage}
      />
    </>
  );
};

export default DetailsHeader;
