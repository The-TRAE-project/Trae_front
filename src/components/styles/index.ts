import styled from 'styled-components';
import { Box } from '@mantine/core';

import bg from '../../assets/bg.svg';
import { fApart } from '../../helpers/cssFragments';
import { mediaQueries } from '../../constants/breakpoints';
import { colors } from '../../constants/colors';

export const Container = styled.div`
  margin: 0 auto;
  @media ${mediaQueries.mqMedium} {
    max-width: calc(100vw - 213px);
  }

  @media ${mediaQueries.mqLarge} {
    max-width: calc(100vw - 426px);
  }

  @media ${mediaQueries.mqXlarge} {
    max-width: calc(100vw - 640px);
  }
`;

export const WrapperWithBgImage = styled.section`
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  @media ${mediaQueries.mqMedium} {
    padding: 85px 0 64px;
  }

  @media ${mediaQueries.mqLarge} {
    padding: 105px 0 84px;
  }

  @media ${mediaQueries.mqXlarge} {
    padding: 185px 0 104px;
  }
`;

export const ApartContainer = styled(Container)`
  ${fApart};

  @media ${mediaQueries.mqMedium} {
    min-height: calc(100vh - 149px);
  }

  @media ${mediaQueries.mqLarge} {
    min-height: calc(100vh - 189px);
  }

  @media ${mediaQueries.mqXlarge} {
    min-height: calc(100vh - 289px);
  }
`;

export const TraeLogoImageWrapper = styled(Box)`
  @media ${mediaQueries.mqMedium} {
    height: 349px;
    width: 278px;
  }

  @media ${mediaQueries.mqLarge} {
    height: 449px;
    width: 378px;
  }

  @media ${mediaQueries.mqXlarge} {
    height: 549px;
    width: 478px;
  }
`;

export const WrapperBgGreen = styled(WrapperWithBgImage)`
  background: linear-gradient(
    264.53deg,
    ${colors.gradientGreen1} 2.46%,
    ${colors.gradientGreen2} 70.65%
  );
`;

export const WrapperBgWhite = styled(WrapperWithBgImage)`
  background: ${colors.white2};
`;
