import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { useReceiveProjectStageMutation } from '../../../../store/apis/employee';
import { ProjectStage } from '../../../../store/apis/employee/types';
import { logout } from '../../../../store/slices/employee';
import ArrowDown from '../../../svgs/ArrowDown';
import ArrowUp from '../../../svgs/ArrowUp';
import ConfirmModal from '../../ConfrimModal';
import { ArrowWrapper, StageName, Employee, Wrapper } from './styles';

interface Props {
  stage: ProjectStage;
  index: number;
  lastStage?: ProjectStage;
}

const StageCard = ({ stage, index, lastStage }: Props) => {
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
      showErrorNotification(error.data.status, error.data.error);
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
        {lastStage?.id !== stage.id &&
          (!(index % 2) ? (
            <ArrowWrapper>
              <ArrowDown
                color={stage.isEnded ? 'var(--green)' : 'var(--orange)'}
              />
            </ArrowWrapper>
          ) : (
            <ArrowWrapper $up={!!(index % 2)}>
              <ArrowUp
                color={stage.isEnded ? 'var(--green)' : 'var(--orange)'}
              />
            </ArrowWrapper>
          ))}
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
