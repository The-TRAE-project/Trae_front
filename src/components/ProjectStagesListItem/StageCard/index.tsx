import { useState } from 'react';

import { ProjectStage } from '../../../helpers/services/types';
import ConfirmModal from '../../ConfirmModal';
import ArrowDown from '../../svgs/ArrowDown';
import ArrowUp from '../../svgs/ArrowUp';
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

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <Wrapper className={isComplete || isTodo || isNextNeedComplete}>
        <StageStatus
          onClick={handleOpenModal}
          className={isComplete || isTodo || isNextNeedComplete}
          disabled={stage.isTodo || stage.isComplete}
        >
          {stage.stage}
        </StageStatus>
        <Employee>{stage.employee}</Employee>
        {down ? (
          <StatusArrowDown>
            <ArrowDown
              color={
                stage.isComplete || stage.isTodo
                  ? 'var(--green)'
                  : 'var(--orange)'
              }
            />
          </StatusArrowDown>
        ) : (
          <StatusArrowUp>
            <ArrowUp
              color={
                stage.isComplete || stage.isTodo
                  ? 'var(--green)'
                  : 'var(--orange)'
              }
            />
          </StatusArrowUp>
        )}
      </Wrapper>
      <ConfirmModal
        isOpen={opened}
        onClose={handleCloseModal}
        questionTitle="Иван Иванов"
        informTitle="Иван Иванов"
      />
    </>
  );
};

export default StageCard;
