import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { Employee } from '../../../../store/apis/employee/types';
import { setEmployee } from '../../../../store/slices/employee';
import { BgWhiteCard, BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  employee: Employee;
}

const EmployeeItem = ({ employee }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToEditingPage = () => {
    navigate(Paths.EMPLOYEES_EDITING);
    dispatch(setEmployee(employee));
  };

  return (
    <BgWhiteCard>
      <BgWhiteCardLinkBtn onClick={navigateToEditingPage} type="button">
        {employee.firstName} {employee.lastName}
      </BgWhiteCardLinkBtn>
    </BgWhiteCard>
  );
};

export default EmployeeItem;
