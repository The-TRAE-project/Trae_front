import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import GlobalStyles from '../../styles/GlobalStyles';
import theme from '../../styles/theme';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              fontFamily: 'Raleway, sans-serif',
            }}
          >
            <GlobalStyles />
            <Wrapper>
              <Header />
              <ContentWrapper>{children}</ContentWrapper>
            </Wrapper>
          </MantineProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Layout;
