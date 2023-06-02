import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '@mantine/hooks';

import { Roles } from '../../store/slices/auth/types';
import { Status } from '../../store/apis/user/types';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import SEO from '../../components/SEO';
import PageHeader from '../../components/PageHeader';
import UserFilterMenu from '../../components/Users/UserFilterMenu';
import UsersListItem from '../../components/Users/UsersListItem';
import {
  Container,
  ContentStack,
  WrapperGradientGreen,
} from '../../components/styles';

const Constructors = () => {
  const [paramRole, setParamRole] = useLocalStorage<string | null>({
    key: LocalStorage.USER_ROLE,
    defaultValue: Roles.CONSTRUCTOR,
  });
  const [paramActive, setParamActive] = useLocalStorage<Status | null>({
    key: LocalStorage.USER_STATUS,
    defaultValue: Status.ACTIVE,
  });

  const navigate = useNavigate();

  const navigateToCreateConstructorPage = () =>
    navigate(Paths.CONSTRUCTOR_CREATE);

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
          <ContentStack>
            <PageHeader
              filter={
                <UserFilterMenu
                  status={paramActive}
                  setStatus={setParamActive}
                  resetStatus={() => setParamActive(null)}
                  role={paramRole}
                  setRole={setParamRole}
                  resetRole={() => setParamRole(null)}
                />
              }
              onCreate={navigateToCreateConstructorPage}
            />

            <UsersListItem paramRole={paramRole} paramActive={paramActive} />
          </ContentStack>
        </Container>
      </WrapperGradientGreen>
    </>
  );
};

export default Constructors;
