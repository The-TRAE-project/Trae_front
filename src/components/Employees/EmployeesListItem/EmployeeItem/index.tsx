import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { Employee } from '../../../../store/apis/employee/types';
import { setEmployeeToEdit } from '../../../../store/slices/employee';
import { BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  employee: Employee;
}

const EmployeeItem = ({ employee }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToEditingPage = () => {
    navigate(Paths.EMPLOYEE_EDITING);
    dispatch(setEmployeeToEdit(employee));
  };

  return (
    <BgWhiteCardLinkBtn onClick={navigateToEditingPage} type="button">
      {employee.firstName} {employee.lastName}
    </BgWhiteCardLinkBtn>
  );
};

export default EmployeeItem;
