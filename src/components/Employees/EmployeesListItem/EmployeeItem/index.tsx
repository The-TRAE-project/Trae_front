import { useNavigate } from 'react-router-dom';

import { Paths } from '../../../../constants/paths';
import { Employee } from '../../../../store/apis/employee/types';
import { BgWhiteCard, BgWhiteCardLinkBtn } from '../../../styles';

interface Props {
  employee: Employee;
}

const EmployeeItem = ({ employee }: Props) => {
  const navigate = useNavigate();

  const navigateToEditingPage = () => {
    navigate(Paths.EMPLOYEES_EDITING, { state: { id: employee.id } });
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
