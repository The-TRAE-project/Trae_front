import Delivery from '../../../../svgs/Delivery';
import { TableIcon } from '../ContractIcon';
import Contract from '../../../../svgs/Contract';
import { TableCellContent, OverdueWrapper } from '../styles';
import { AdditionalInfoIcon } from '../AdditionalInfoIcon';

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
    <TableCellContent
      $isEnded={isEnded}
      $inWork={inWork}
      $readyToAcceptance={readyToAcceptance}
      $length={length}
      $isEndDateInContract={isEndDateInContract}
    >
      {isEndDateInContract && (
        <TableIcon projectId={projectId} icon={Contract()} />
      )}
      {isOverlapping && (
        <TableIcon projectId={projectId} icon={AdditionalInfoIcon()} />
      )}
      <OverdueWrapper $isOverdue={isOverdue}>
        {name === 'Отгрузка' ? <Delivery color={color} /> : name}
      </OverdueWrapper>
    </TableCellContent>
  );
}
