import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import Home from '../../components/svgs/Home';
import Plus from '../../components/svgs/Plus';
import WorkTypesFilterMenu from '../../components/WorkTypes/WorkTypesFilterMenu';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';
import WorkTypesListItem from '../../components/WorkTypes/WorkTypesListItem';

const WorkTypes = () => {
  const [paramActive, setParamActive] = useState<Status | null>(Status.ACTIVE);

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.PROJECTS);
  const navigateToCreateWorkTypesPage = () => navigate(Paths.WORK_TYPES_CREATE);

  return (
    <>
      <SEO
        title="TRAE | Типы работ"
        description="Страница типов работ."
        name="TRAE"
        type="application"
      />
      <WrapperGradientGreen>
        <Container>
          <Stack spacing={50}>
            <Group position="apart" spacing={100}>
              <Group spacing={40}>
                <WorkTypesFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                />
                <UnstyledButton onClick={navigateToHome} type="button">
                  <Home />
                </UnstyledButton>
              </Group>

              <OrangeButton
                onClick={navigateToCreateWorkTypesPage}
                type="button"
              >
                <Plus />
                <span>Добавить</span>
              </OrangeButton>
            </Group>

            <WorkTypesListItem paramActive={paramActive} />
          </Stack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default WorkTypes;
