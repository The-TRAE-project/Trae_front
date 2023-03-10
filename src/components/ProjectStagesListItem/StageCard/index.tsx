import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useReceiveProjectStageMutation } from '../../../store/apis/employee';
import { ProjectStage } from '../../../store/apis/employee/types';
import { logout } from '../../../store/slices/employee';
import ConfirmModal from '../../ConfirmModal';
import ArrowDown from '../../svgs/ArrowDown';
import ArrowUp from '../../svgs/ArrowUp';
import {
  StageName,
  Employee,
  Wrapper,
  StatusArrowDown,
  StatusArrowUp,
} from './styles';

interface Props {
  stage: ProjectStage;
  down?: boolean;
}

const StageCard = ({ stage, down }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const [receiveProject] = useReceiveProjectStageMutation();

  const isComplete = stage.isEnded ? 'completed' : '';
  const isReady = stage.readyToAcceptance ? 'readyToAcceptance' : '';
  const isInWork = stage.inWork ? 'inWork' : '';

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  const handleReceiveProject = async () => {
    try {
      if (!employee) return;

      await receiveProject({
        employeeId: employee.id,
        operationId: stage.id,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleCloseModal();
      showErrorNotification(
        error.response.data.status,
        error.response.data.error
      );
    }
  };

  const handleCloseInformModal = () => {
    navigate(Paths.EMPLOYEE_LOGIN);
    dispatch(logout());
  };

  return (
    <>
      <Wrapper className={isComplete || isReady || isInWork}>
        <StageName
          onClick={handleOpenModal}
          className={isComplete || isReady || isInWork}
          disabled={stage.inWork || stage.isEnded || !stage.readyToAcceptance}
        >
          {stage.name}
        </StageName>
        <Employee>
          {stage.employeeFirstName &&
            stage.employeeLastName &&
            `${stage.employeeFirstName} ${stage.employeeLastName}`}
        </Employee>
        {down ? (
          <StatusArrowDown>
            <ArrowDown
              color={stage.isEnded ? 'var(--green)' : 'var(--orange)'}
            />
          </StatusArrowDown>
        ) : (
          <StatusArrowUp>
            <ArrowUp color={stage.isEnded ? 'var(--green)' : 'var(--orange)'} />
          </StatusArrowUp>
        )}
      </Wrapper>
      <ConfirmModal
        isOpen={opened}
        onClose={handleCloseModal}
        onCloseInformModal={handleCloseInformModal}
        isHideHomeBtn={false}
        handleAgreementClick={handleReceiveProject}
        questionTitle={`${employee?.firstName} ${
          employee?.lastName
        } начинает <br /> этап ${stage.name.toLowerCase()}?`}
        informTitle={`${employee?.firstName} ${
          employee?.lastName
        } начал этап ${stage.name.toLowerCase()}`}
      />
    </>
  );
};

export default StageCard;
