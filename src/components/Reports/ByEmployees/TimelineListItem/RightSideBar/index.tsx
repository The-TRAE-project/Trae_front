import { EmployeeTotalShiftInfo } from '../../../../../store/apis/reports/types';
import { TotalListItem, TotalTitle, Wrapper } from './styles';

interface Props {
  totalShifts: EmployeeTotalShiftInfo[];
}

const RightSideBar = ({ totalShifts }: Props) => {
  return (
    <Wrapper>
      <TotalTitle $isFirst>Итого смен</TotalTitle>
      <TotalListItem>
        {totalShifts.map((totalShift) => (
          <TotalTitle key={totalShift.id}>
            {totalShift.totalPartsOfShift}
          </TotalTitle>
        ))}
      </TotalListItem>
    </Wrapper>
  );
};

export default RightSideBar;
