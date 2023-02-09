import styled from 'styled-components';

import { mediaQueries } from '../../../constants/breakpoints';

type DisplayTimeProps = {
  color: string;
};

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;
  @media ${mediaQueries.mqMedium} {
    padding: 20px;
    top: 44px;
  }

  @media ${mediaQueries.mqLarge} {
    padding: 30px;
    top: 54px;
  }

  @media ${mediaQueries.mqXlarge} {
    padding: 40px;
    top: 64px;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;

  svg {
    @media ${mediaQueries.mqMedium} {
      height: 30px;
      width: 30px;
    }

    @media ${mediaQueries.mqLarge} {
      height: 40px;
      width: 40px;
    }

    @media ${mediaQueries.mqXlarge} {
      width: 50px;
      height: 50px;
    }
  }
`;

export const DisplayTime = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 54px;
  line-height: 63px;
  color: ${(props: DisplayTimeProps) => props.color};
  opacity: 0.9;
  margin: 0;
`;
