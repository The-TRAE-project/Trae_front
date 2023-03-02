import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../constants/paths';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
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

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  const handleReceiveProject = async () => {
    try {
      if (!employee) return;

      await receiveProject({ employeeId: employee.id, operationId: stage.id });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleCloseInformModal = () => {
    navigate(Paths.EMPLOYEE_LOGIN);
    dispatch(logout());
  };

  return (
    <>
      <Wrapper className={isComplete || isReady}>
        <StageName
          onClick={handleOpenModal}
          className={isComplete || isReady}
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
