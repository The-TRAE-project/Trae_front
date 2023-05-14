import { Group, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import SEO from '../../components/SEO';
import ProjectFilterMenu from '../../components/Project/ProjectFilterMenu';
import ProjectSearchInput from '../../components/Project/ProjectSearchInput';
import ProjectListItem from '../../components/Project/ProjectListItem';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';

const Projects = () => {
  const [paramActive, setParamActive] = useLocalStorage<Status | null>({
    key: LocalStorage.PROJECT_STATUS,
    defaultValue: Status.ACTIVE,
  });

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.DASHBOARD);
  const navigateToCreateProjectPage = () => navigate(Paths.PROJECTS_CREATE);

  return (
    <>
      <SEO
        title="TRAE | Проекты"
        description="Страница проектов."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={87}>
            <Group position="apart" spacing={100}>
              <Group spacing={40}>
                <ProjectFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <BsFillHouseFill size={44} color="var(--orange)" />
                </UnstyledButton>
              </Group>

              <ProjectSearchInput />

              <OrangeButton onClick={navigateToCreateProjectPage} type="button">
                <AiOutlinePlusCircle size={30} color="var(--white)" />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            <ProjectListItem />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Projects;
