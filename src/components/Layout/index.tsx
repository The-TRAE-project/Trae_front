import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        <Notifications />
        <GlobalStyles />
        <Wrapper>
          <Header />
          <ContentWrapper>{children}</ContentWrapper>
        </Wrapper>
      </MantineProvider>
    </ThemeProvider>
  );
};

export default Layout;
