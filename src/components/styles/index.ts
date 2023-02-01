import styled from 'styled-components';
import { Box } from '@mantine/core';

import { fApart } from '../../helpers/cssFragments';
import bg from '../../assets/bg.svg';
import { mediaQueries } from '../../constants/breakpoints';

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

export const WrapperWithBgImage = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;

  @media ${mediaQueries.mqMedium} {
    padding: 145px 0 64px;
  }

  @media ${mediaQueries.mqLarge} {
    padding: 165px 0 84px;
  }

  @media ${mediaQueries.mqXlarge} {
    padding: 185px 0 104px;
  }
`;

export const ApartContainer = styled(Container)`
  ${fApart};

  @media ${mediaQueries.mqMedium} {
    min-height: calc(100vh - 209px);
  }

  @media ${mediaQueries.mqLarge} {
    min-height: calc(100vh - 249px);
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
