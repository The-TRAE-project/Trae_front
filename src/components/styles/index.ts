import styled from 'styled-components';
import { Box } from '@mantine/core';

import bg from '../../assets/bg.svg';

export const Container = styled.div`
  margin: 0 auto;
  @media ${({ theme }) => theme.bp.bpXlarge} {
    max-width: calc(100vw - 640px);
  }
`;

export const WrapperWithBgImage = styled.section`
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  @media ${({ theme }) => theme.bp.bpXlarge} {
    padding: 185px 0 104px;
  }
`;

export const ApartContainer = styled(Container)`
  ${({ theme }) => theme.mixins.apart};

  @media ${({ theme }) => theme.bp.bpXlarge} {
    min-height: calc(100vh - 289px);
  }
`;

export const TraeLogoImageWrapper = styled(Box)`
  @media ${({ theme }) => theme.bp.bpXlarge} {
    height: 549px;
    width: 478px;
  }
`;

export const WrapperBgGreen = styled(WrapperWithBgImage)`
  background: linear-gradient(
    264.53deg,
    var(--gradient-green1) 2.46%,
    var(--gradient-green2) 70.65%
  );
`;

export const WrapperBgWhite = styled(WrapperWithBgImage)`
  background: var(--white2);
`;
