import styled from 'styled-components';
import { mediaQueries } from '../../../constants/breakpoints';

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

type ButtonProps = {
  isOrange?: boolean;
};

export const Button = styled.button`
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;
  color: ${(props: ButtonProps) => (props.isOrange ? '#FF9A4A' : '#fdf7f7')};

  svg {
    @media ${mediaQueries.mqMedium} {
      height: 20px;
      width: 20px;
    }

    @media ${mediaQueries.mqLarge} {
      height: 30px;
      width: 30px;
    }

    @media ${mediaQueries.mqXlarge} {
      height: 40px;
      width: 40px;
    }
  }
`;
