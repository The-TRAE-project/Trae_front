import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { ThemeProvider } from 'styled-components';
import 'dayjs/locale/ru';

import { Roles } from '../../store/slices/auth/types';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { useNavigateLoggedInUser } from '../../helpers/hooks/useNavigateLoggedInUser';
import { useClearLocalStorageByPath } from '../../helpers/hooks/useClearLocalStorageByPath';
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
  useClearLocalStorageByPath();

  return (
    <ThemeProvider theme={theme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Raleway, sans-serif',

          breakpoints: {
            xs: '30em',
            sm: '48em',
            md: '64em',
            lg: '74em',
            xl: '90em',
          },
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
