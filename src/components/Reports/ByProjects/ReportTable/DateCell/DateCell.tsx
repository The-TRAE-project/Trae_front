import { useState } from 'react';
import Delivery from '../../../../svgs/Delivery';
import { TableIcon } from '../TableIcon';
import Contract from '../../../../svgs/Contract';
import { AdditionalInfoIcon } from '../AdditionalInfoIcon';
import styles from './DateCell.module.scss';
import BoxTail from '../../../../svgs/BoxTail';

interface Props {
  isOverdue?: boolean;
  isEnded?: boolean;
  inWork?: boolean;
  readyToAcceptance?: boolean;
  isEndDateInContract?: boolean;
  isOverlapping?: boolean;
  length?: number | null;
  projectId: number;
  name?: string;
}

export function DateCell({
  isEndDateInContract,
  isEnded,
  isOverdue,
  inWork,
  readyToAcceptance,
  isOverlapping,
  length,
  projectId,
  name,
}: Props) {
  const [showClue, setShowClue] = useState<boolean>(false);

  let color;

  if (isOverdue) {
    color = 'var(--red2)';
  } else if (isEnded) {
    color = 'var(--black)';
  } else if (inWork || readyToAcceptance) {
    color = 'var(--white)';
  } else {
    color = 'var(--orange)';
  }

  return (
    <div
      onMouseEnter={length && length <= 2 ? () => setShowClue(true) : undefined}
      onMouseLeave={
        length && length <= 2 ? () => setShowClue(false) : undefined
      }
    >
      {showClue && (
        <div className={styles.dateCell__clue}>
          {name}
          <BoxTail className={styles.dateCell__clue_tail} />
        </div>
      )}
      <div
        className={`${styles.dateCell} ${
          isEnded ? styles.dateCell_ended : ''
        } ${inWork ? styles.dateCell_inWork : ''} ${
          readyToAcceptance ? styles.dateCell_available : ''
        } ${length ? styles.dateCell_operation : ''}`}
        style={{ width: `${33 * (length ?? 1)}px` }}
      >
        {isEndDateInContract && (
          <TableIcon projectId={projectId} icon={Contract()} />
        )}
        {isOverlapping && (
          <TableIcon projectId={projectId} icon={AdditionalInfoIcon()} />
        )}
        <div
          className={`${styles.dateCell__wrapper} ${
            isOverdue ? styles.dateCell__wrapper_overdue : ''
          }`}
        >
          {name === 'Отгрузка' ? <Delivery color={color} /> : name}
        </div>
      </div>
    </div>
  );
}
