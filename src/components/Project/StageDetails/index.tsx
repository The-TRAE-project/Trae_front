import { useState } from 'react';
import { Stack } from '@mantine/core';

import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useCloseProjectOperationMutation } from '../../../store/apis/project';
import Loader from '../../Loader';
import ConfirmModal from '../../ConfrimModal';
import { Paths } from '../../../constants/paths';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import StageBody from './StageBody';
import StageHeader from './StageHeader';

const StageDetails = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { projectStage } = useAppSelector((store) => store.project);

  const [closeOperation, { isLoading }] = useCloseProjectOperationMutation();

  const handleSubmit = async () => {
    try {
      if (!projectStage) return;

      await closeOperation(projectStage.id).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error.data.status, error.data.error);
    }
  };

  const confirmTitle = `Завершить этап ${projectStage?.name.toLowerCase()} <br /> проект №${
    projectStage?.projectNumber
  } `;

  const informTitle = `Этап  ${projectStage?.name.toLowerCase()} проект №${
    projectStage?.projectNumber
  } <br /> завершен `;

  return (
    <>
      <Stack spacing={99}>
        {projectStage ? (
          <>
            <StageHeader
              isInWork={projectStage.inWork}
              isLoading={isLoading}
              onOpen={() => setIsOpen(true)}
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
        confirmTitle={confirmTitle}
        informTitle={informTitle}
        backPath={Paths.PROJECT_DETAILS}
      />
    </>
  );
};

export default StageDetails;
