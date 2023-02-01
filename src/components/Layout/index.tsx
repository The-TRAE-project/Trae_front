import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import Header from './Header';
import { ContentWrapper, Wrapper } from './styles';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Raleway, sans-serif',
      }}
    >
      <Wrapper>
        <Header />
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </MantineProvider>
  );
};

export default Layout;
