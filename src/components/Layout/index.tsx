import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { ThemeProvider } from 'styled-components';
import 'dayjs/locale/ru';

import { Roles } from '../../store/slices/auth/types';
import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { useClearLocalStorageByPath } from '../../helpers/hooks/useClearLocalStorageByPath';
import { Paths } from '../../constants/paths';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import EmployeeHeader from './EmployeeHeader';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';
import { ConstructorHeader } from './ConstructorHeader';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const location = useLocation();
  const { permission, isLoggedIn } = useAppSelector((store) => store.auth);

  useClearLocalStorageByPath();

  let header;

  switch (permission) {
    case Roles.EMPLOYEE:
      header = <EmployeeHeader />;
      break;
    case Roles.ADMIN:
      header = <Header />;
      break;
    case Roles.CONSTRUCTOR:
      header =
        location.pathname === Paths.CONSTRUCTOR_MAIN_PAGE ? (
          <ConstructorHeader />
        ) : null;
      break;
    default:
      header = '';
  }

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
            {location.pathname !== Paths.LOGIN && isLoggedIn && header}
            <ContentWrapper>{children}</ContentWrapper>
          </Wrapper>
        </DatesProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default Layout;
