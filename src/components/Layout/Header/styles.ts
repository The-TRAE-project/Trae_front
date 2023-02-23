import styled from 'styled-components';

import { mediaQueries } from '../../../constants/breakpoints';

type DisplayTimeProps = {
  path: boolean;
};

export const Wrapper = styled.header`
  position: fixed;
  width: 100%;
  z-index: 100;

  @media ${mediaQueries.mqXlarge} {
    padding: 40px;
    top: 36px;
  }
`;

export const Button = styled.button`
  background: none;
  border: none;
  text-align: center;
  cursor: pointer;

  svg {
    @media ${({ theme }) => theme.bp.mqXlarge} {
      width: 50px;
      height: 50px;
    }
  }
`;

export const DisplayTime = styled.p`
  font-family: var(--font-roboto);
  font-weight: 600;
  font-size: 54px;
  line-height: 63px;
  color: ${(props: DisplayTimeProps) =>
    props.path ? 'var(--white-black)' : 'var(--white)'};
  opacity: 0.9;
`;
