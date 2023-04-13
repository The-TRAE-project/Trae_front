import { useState } from 'react';
import { Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { Roles } from '../../store/slices/auth/types';
import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import UserFilterMenu from '../../components/Users/UserFilterMenu';
import UsersListItem from '../../components/Users/UsersListItem';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const Constructors = () => {
  const [paramRole, setParamRole] = useState<string | null>(Roles.CONSTRUCTOR);
  const [paramActive, setParamActive] = useState<Status | null>(Status.ACTIVE);

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.PROJECTS);
  const navigateToCreateConstructorPage = () =>
    navigate(Paths.CONSTRUCTORS_CREATE);

  return (
    <>
      <SEO
        title="TRAE | Конструкторы"
        description="Страница конструкторов."
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
                  <BsFillHouseFill size={44} color="var(--orange)" />
                </UnstyledButton>
              </Group>

              <OrangeButton
                onClick={navigateToCreateConstructorPage}
                type="button"
              >
                <AiOutlinePlusCircle size={30} color="var(--white)" />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            <UsersListItem paramRole={paramRole} paramActive={paramActive} />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Constructors;
