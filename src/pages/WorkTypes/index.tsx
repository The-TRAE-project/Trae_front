import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import SEO from '../../components/SEO';
import { LocalStorage } from '../../constants/localStorage';
import WorkTypesFilterMenu from '../../components/WorkTypes/WorkTypesFilterMenu';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';
import WorkTypesListItem from '../../components/WorkTypes/WorkTypesListItem';
import PageHeader from '../../components/PageHeader';

const WorkTypes = () => {
  const [paramActive, setParamActive] = useLocalStorage<Status | null>({
    key: LocalStorage.WORK_TYPE_STATUS,
    defaultValue: null,
  });

  const navigate = useNavigate();

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
          <ContentStack>
            <PageHeader
              filter={
                <WorkTypesFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                />
              }
              onCreate={navigateToCreateWorkTypesPage}
            />

            <WorkTypesListItem paramActive={paramActive} />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default WorkTypes;
