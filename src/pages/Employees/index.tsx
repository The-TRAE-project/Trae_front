import { useState } from 'react';
import { Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import Home from '../../components/svgs/Home';
import Plus from '../../components/svgs/Plus';
import EmployeesFilterMenu from '../../components/Employees/EmployeesFilterMenu';
import EmployeesListItem from '../../components/Employees/EmployeesListItem';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const Employees = () => {
  const [paramTypeWorkId, setParamTypeWorkId] = useState<number | null>(null);
  const [paramActive, setParamActive] = useState<Status | null>(Status.ACTIVE);

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.PROJECTS);
  const navigateToCreateEmployeePage = () => navigate(Paths.EMPLOYEES_CREATE);

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
                  typeWork={paramTypeWorkId}
                  setTypeWork={setParamTypeWorkId}
                  resetTypeWork={() => setParamTypeWorkId(null)}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <Home />
                </UnstyledButton>
              </Group>

              <OrangeButton
                onClick={navigateToCreateEmployeePage}
                type="button"
              >
                <Plus />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            <EmployeesListItem
              paramTypeWorkId={paramTypeWorkId}
              paramActive={paramActive}
            />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Employees;
