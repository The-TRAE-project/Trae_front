import { useState } from 'react';
import { Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Roles } from '../../store/slices/auth/types';
import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import Home from '../../components/svgs/Home';
import Plus from '../../components/svgs/Plus';
import UserFilterMenu from '../../components/Users/UserFilterMenu';
import UsersListItem from '../../components/Users/UsersListItem';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const Employees = () => {
  const [paramRole, setParamRole] = useState<string | null>(Roles.CONSTRUCTOR);
  const [paramActive, setParamActive] = useState<Status | null>(Status.ACTIVE);

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.PROJECTS);
  const navigateToWorkTypesPage = () => navigate(Paths.WORK_TYPES);

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
                <UserFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                  role={paramRole}
                  setRole={setParamRole}
                  resetRole={() => setParamRole(null)}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <Home />
                </UnstyledButton>
              </Group>

              <OrangeButton onClick={navigateToWorkTypesPage} type="button">
                <span>Типы работ</span>
              </OrangeButton>
            </Group>

            <UsersListItem paramRole={paramRole} paramActive={paramActive} />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Employees;
