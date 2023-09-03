import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import EmployeesFilterMenu from '../../components/Employees/EmployeesFilterMenu';
import EmployeesListItem from '../../components/Employees/EmployeesListItem';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';

const Employees = () => {
  const [paramTypeWorkIds, setParamTypeWorkIds] = useLocalStorage<
    number[] | null
  >({
    key: LocalStorage.EMPLOYEE_TYPE_WORKS,
    defaultValue: [],
  });
  const [paramActive, setParamActive] = useLocalStorage<Status | null>({
    key: LocalStorage.EMPLOYEE_STATUS,
    defaultValue: Status.ACTIVE,
  });

  const navigate = useNavigate();

  const navigateToCreateEmployeePage = () => navigate(Paths.EMPLOYEE_CREATE);

  return (
    <>
      <SEO
        title="TRAE | Сотрудники"
        description="Страница сотрудников."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <ContentStack>
            <PageHeader
              filter={
                <EmployeesFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                  typeWorks={paramTypeWorkIds}
                  setTypeWorks={setParamTypeWorkIds}
                  resetTypeWork={() => setParamTypeWorkIds([])}
                />
              }
              onCreate={navigateToCreateEmployeePage}
            />

            <EmployeesListItem
              paramTypeWorkIds={paramTypeWorkIds}
              paramActive={paramActive}
            />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Employees;
