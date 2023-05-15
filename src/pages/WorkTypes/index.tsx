import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { BsFillHouseFill } from 'react-icons/bs';
import { AiOutlinePlusCircle } from 'react-icons/ai';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import { LocalStorage } from '../../constants/localStorage';
import WorkTypesFilterMenu from '../../components/WorkTypes/WorkTypesFilterMenu';
import {
  Container,
  OrangeButton,
  UnstyledButton,
  WrapperGradientGreen,
} from '../../components/styles';
import WorkTypesListItem from '../../components/WorkTypes/WorkTypesListItem';

const WorkTypes = () => {
  const [paramActive, setParamActive] = useLocalStorage<Status | null>({
    key: LocalStorage.WORK_TYPE_STATUS,
    defaultValue: null,
  });

  const navigate = useNavigate();

  const navigateToHome = () => navigate(Paths.DASHBOARD);
  const navigateToCreateWorkTypesPage = () => navigate(Paths.WORK_TYPE_CREATE);

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
                  <BsFillHouseFill size={44} color="var(--orange)" />
                </UnstyledButton>
              </Group>

              <OrangeButton
                onClick={navigateToCreateWorkTypesPage}
                type="button"
              >
                <AiOutlinePlusCircle size={30} color="var(--white)" />
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
