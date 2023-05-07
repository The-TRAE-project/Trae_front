import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { useReceiveProjectStageMutation } from '../../../../store/apis/employee';
import { ProjectStage } from '../../../../store/apis/employee/types';
import {
  clearEmployeeState,
  setTimer,
} from '../../../../store/slices/employee';
import ArrowDown from '../../../svgs/ArrowDown';
import ArrowUp from '../../../svgs/ArrowUp';
import ConfirmModal from '../../ConfirmModal';
import { ArrowWrapper, StageName, Employee, Wrapper } from './styles';

interface Props {
  stage: ProjectStage;
  index: number;
  lastStage?: ProjectStage;
}

const StageCard = ({ stage, index, lastStage }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { employee } = useAppSelector((store) => store.employee);

  const [receiveProject] = useReceiveProjectStageMutation();

  const isComplete = stage.isEnded ? 'completed' : '';
  const isReady = stage.readyToAcceptance ? 'readyToAcceptance' : '';
  const isInWork = stage.inWork ? 'inWork' : '';

  const handleOpen = () => {
    setIsOpen(true);
    dispatch(setTimer(121));
  };

  const handleClose = () => {
    setIsOpen(false);
    dispatch(setTimer(121));
  };

  const handleSubmit = async () => {
    try {
      if (!employee) return;

      await receiveProject({
        employeeId: employee.id,
        operationId: stage.id,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      showErrorNotification(error.data.status, error.data.error);
    }
  };

  const handleCallAtEnd = () => {
    navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
    dispatch(clearEmployeeState());
  };

  const confirmTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  } начинает <br /> этап ${stage.name.toLowerCase()}?`;

  const informTitle = `${
    employee && `${employee.firstName} ${employee.lastName}`
  } начал этап ${stage.name.toLowerCase()}`;

  const classes = isComplete || isReady || isInWork;

  return (
    <>
      <Wrapper
        onClick={handleOpen}
        disabled={stage.inWork || stage.isEnded || !stage.readyToAcceptance}
        className={classes}
      >
        <StageName className={classes}>{stage.name}</StageName>
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
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        onCallAtEnd={handleCallAtEnd}
        isHideHomeBtn={false}
        confirmTitle={confirmTitle}
        informTitle={informTitle}
      />
    </>
  );
};

export default StageCard;
