import { useState } from 'react';

import { colors } from '../../../constants/colors';
import { ProjectStage } from '../../../helpers/services/types';
import ArrowDown from '../../svgs/ArrowDown';
import ArrowUp from '../../svgs/ArrowUp';
import ChooseEmployeeModal from '../ChooseEmployeeModal';
import {
  StageStatus,
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

  const isComplete = stage.isComplete ? 'completed' : '';
  const isTodo = stage.isTodo ? 'isTodo' : '';
  const isNextNeedComplete = stage.isNext ? 'next' : '';

  const handleChooseEmployee = () => {
    setOpened(true);
  };

  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Wrapper className={isComplete || isTodo || isNextNeedComplete}>
        <StageStatus
          onClick={handleChooseEmployee}
          className={isComplete || isTodo || isNextNeedComplete}
        >
          {stage.stage}
        </StageStatus>
        <Employee>{stage.employee}</Employee>
        {down ? (
          <StatusArrowDown>
            <ArrowDown
              color={
                stage.isComplete || stage.isTodo ? colors.green : colors.orange
              }
            />
          </StatusArrowDown>
        ) : (
          <StatusArrowUp>
            <ArrowUp
              color={
                stage.isComplete || stage.isTodo ? colors.green : colors.orange
              }
            />
          </StatusArrowUp>
        )}
      </Wrapper>
      <ChooseEmployeeModal isOpen={opened} onClose={handleCloseModal} />
    </>
  );
};

export default StageCard;
