import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { ThemeProvider } from 'styled-components';
import 'dayjs/locale/ru';

import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { useNavigateLoggedInUser } from '../../helpers/hooks/useNavigateLoggedInUser';
import { useClearEmployeesFilterValues } from '../../helpers/hooks/useClearEmployeesFilterValues';
import { Roles } from '../../store/slices/auth/types';
import { Paths } from '../../constants/paths';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import EmployeeHeader from './EmployeeHeader';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const { permission, isLoggedIn } = useAppSelector((store) => store.auth);

  useNavigateLoggedInUser();
  useClearEmployeesFilterValues();

  return (
    <ThemeProvider theme={theme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        <DatesProvider settings={{ locale: 'ru' }}>
          <Notifications />
          <GlobalStyles />
          <Wrapper>
            {location.pathname !== Paths.LOGIN &&
              isLoggedIn &&
              (permission === Roles.EMPLOYEE ? <EmployeeHeader /> : <Header />)}
            <ContentWrapper>{children}</ContentWrapper>
          </Wrapper>
        </DatesProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default Layout;
