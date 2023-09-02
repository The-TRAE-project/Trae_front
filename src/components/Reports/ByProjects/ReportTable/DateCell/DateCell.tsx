import Delivery from '../../../../svgs/Delivery';
import { ContractIcon } from '../ContractIcon';
import { TableCellContent, OverdueWrapper } from '../styles';

interface Props {
  isOverdue?: boolean;
  isEnded?: boolean;
  inWork?: boolean;
  readyToAcceptance?: boolean;
  isEndDateInContract?: boolean;
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
      {isEndDateInContract && <ContractIcon projectId={projectId} />}
      <OverdueWrapper $isOverdue={isOverdue}>
        {name === 'Отгрузка' ? <Delivery color={color} /> : name}
      </OverdueWrapper>
    </TableCellContent>
  );
}
