import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mantine/core';

import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useCloseProjectOperationMutation } from '../../../store/apis/project';
import Loader from '../../Loader';
import ConfirmModal from '../../ConfirmModal';
import FormHeader from '../../FormHeader';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import StageBody from './StageBody';

const StageDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { projectStage } = useAppSelector((store) => store.project);

  const [closeOperation, { isLoading: isCloseLoading, isSuccess }] =
    useCloseProjectOperationMutation();

  const handleSubmit = async () => {
    try {
      if (!projectStage) return;

      await closeOperation(projectStage.id).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error?.data?.status, error?.data?.error);
    }
  };

  const confirmTitle = `Завершить этап ${projectStage?.name.toLowerCase()} <br /> проект №${
    projectStage?.projectNumber
  } `;

  const informTitle = `Этап  ${projectStage?.name.toLowerCase()} проект №${
    projectStage?.projectNumber
  } <br /> завершен `;

  const navigateToBack = () => navigate(`/project/${id}/details`);

  return (
    <>
      <Stack spacing={99}>
        {projectStage ? (
          <>
            <FormHeader
              isShowSubmitBtn={false}
              isShowClickBtn={projectStage.inWork}
              onClick={() => setIsOpen(true)}
              onBack={navigateToBack}
            />
            <StageBody projectStage={projectStage} />
          </>
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
      </Stack>

      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
        onCallAtTheEnd={navigateToBack}
        isSuccess={isSuccess}
        isLoading={isCloseLoading}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
        onBack={navigateToBack}
      />
    </>
  );
};

export default StageDetails;
