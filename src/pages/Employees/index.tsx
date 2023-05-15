import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import SEO from '../../components/SEO';
import EmployeesFilterMenu from '../../components/Employees/EmployeesFilterMenu';
import EmployeesListItem from '../../components/Employees/EmployeesListItem';
import {
  Container,
  OrangeButton,
  UnstyledButton,
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

  const navigateToHome = () => navigate(Paths.DASHBOARD);
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
          <Stack spacing={50}>
            <Group position="apart" spacing={100}>
              <Group spacing={40}>
                <EmployeesFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                  typeWorks={paramTypeWorkIds}
                  setTypeWorks={setParamTypeWorkIds}
                  resetTypeWork={() => setParamTypeWorkIds([])}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <BsFillHouseFill size={44} color="var(--orange)" />
                </UnstyledButton>
              </Group>

              <OrangeButton
                onClick={navigateToCreateEmployeePage}
                type="button"
              >
                <AiOutlinePlusCircle size={30} color="var(--white)" />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            <EmployeesListItem
              paramTypeWorkIds={paramTypeWorkIds}
              paramActive={paramActive}
            />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Employees;
