import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { useCloseProjectMutation } from '../../../../store/apis/project';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { Paths } from '../../../../constants/paths';
import ConfirmModal from '../../../ConfrimModal';
import { OrangeButton, UnstyledButton } from '../../../styles';

interface Props {
  projectId: number;
  projectNumber: number;
  isEnded: boolean;
}

const DetailsHeader = ({ projectId, projectNumber, isEnded }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const [closeProject, { isSuccess, isLoading }] = useCloseProjectMutation();

  const handleCloseProject = async () => {
    try {
      await closeProject(projectId).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err.error);
    }
  };

  const confirmTitle = `Завершить проект №${projectNumber}?`;
  const informTitle = `Проект №${projectNumber} завершен`;

  const navigateBackToProjects = () => navigate(Paths.PROJECTS);

  return (
    <>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleCloseProject}
        onCallAtTheEnd={navigateBackToProjects}
        isSuccess={isSuccess}
        isLoading={isLoading}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
        backPath={Paths.PROJECTS}
      />
      <Group position="apart" spacing={100}>
        <Group spacing={40}>
          <UnstyledButton
            onClick={() => navigate(Paths.PROJECTS)}
            type="button"
          >
            <BsArrowLeft size={50} color="var(--orange)" />
          </UnstyledButton>
          <UnstyledButton
            onClick={() => navigate(Paths.DASHBOARD)}
            type="button"
          >
            <BsFillHouseFill size={44} color="var(--orange)" />
          </UnstyledButton>
        </Group>

        {!isEnded ? (
          <OrangeButton onClick={() => setIsOpen(true)} type="button">
            Завершить
          </OrangeButton>
        ) : null}
      </Group>
    </>
  );
};

export default DetailsHeader;
