import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCloseProjectMutation } from '../../../../store/apis/project';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { Paths } from '../../../../constants/paths';
import ConfirmModal from '../../../ConfirmModal';
import FormHeader from '../../../FormHeader';

interface Props {
  projectId: number;
  projectNumber: number;
  isEnded: boolean;
}

const DetailsHeader = ({ projectId, projectNumber, isEnded }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  // TODO add option to return to reports page
  const navigateToProjects = () => navigate(Paths.PROJECTS);
  const navigateToDeletePage = () => navigate(`/project/${projectId}/delete`);

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
