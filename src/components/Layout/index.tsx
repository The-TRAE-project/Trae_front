import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { DatesProvider } from '@mantine/dates';
import { ThemeProvider } from 'styled-components';
import 'dayjs/locale/ru';

import { useAppSelector } from '../../helpers/hooks/useAppSelector';
import { Roles } from '../../store/slices/auth/types';
import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import EmployeeHeader from './EmployeeHeader';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { permission, isLoggedIn } = useAppSelector((store) => store.auth);

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
            {isLoggedIn &&
              (permission === Roles.EMPLOYEE ? <EmployeeHeader /> : <Header />)}
            <ContentWrapper>{children}</ContentWrapper>
          </Wrapper>
        </DatesProvider>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default Layout;
