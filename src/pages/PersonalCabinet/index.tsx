import { Group, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { IoMdExit } from 'react-icons/io';

import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import UserDetails from '../../components/Users/UserDetails';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const PersonalCabinet = () => {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.PROJECTS);
  const handleLogout = () => navigate(Paths.PROJECTS);

  return (
    <>
      <SEO
        title="TRAE | Личный кабинет"
        description="Личный кабинет пользователя."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={50}>
            <Group position="apart" spacing={100}>
              <UnstyledButton onClick={navigateToHome} type="button">
                <BsFillHouseFill size={44} color="var(--orange)" />
              </UnstyledButton>

              <OrangeButton onClick={handleLogout} type="button" $width={163}>
                <IoMdExit size={32} color="var(--white)" />
                <span>Выйти</span>
              </OrangeButton>
            </Group>

            <UserDetails />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default PersonalCabinet;
